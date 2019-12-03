import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import "rxjs/add/operator/map"
import { InAppBrowser } from "@ionic-native/in-app-browser"
import { URLSearchParams } from "@angular/http"
import { UserStatsProvider } from "./user.stats"
import { DBService } from "./db.service"
import { AuthService } from "./auth.service"
@Injectable()
export class BPService {
	private client_id: string = "5d81605593c6c4e8e1c3871f69fa3ed026659338266b7e27ba07a352bfb6d7fb"
	private redirect_uri: string = "https://atria.coach/api/withings/auth"
	private withingsAuthURL: string = "https://account.withings.com/oauth2_user/authorize2?"
	private withingsDataUrl: string = "https://atria.coach/api/withings/fetchdata?"
	private withingsRefreshTokenUrl: string = "https://atria.coach/api/withings/refresh_token?"

	constructor(
		private http: HttpClient,
		public inAppBrowser: InAppBrowser,
		public userStats: UserStatsProvider,
		public dbService: DBService,
		public authService: AuthService,
	) {}

	public withingsAuth() {
		let params = new URLSearchParams()
		params.set("client_id", this.client_id)
		params.set("response_type", "code")
		params.set("scope", "user.metrics")
		params.set("redirect_uri", this.redirect_uri)
		params.set("state", this.authService.getUID())

		const browser = this.inAppBrowser.create(this.withingsAuthURL + params.toString(), "_self")
		try {
			browser.on("exit").subscribe(() => {})
		} catch (e) {
			console.log(e)
		}
	}

	public fetchBPdata(manual: boolean = false) {
		// console.log(this.userStats.withingsAuth, manual)
		if (!this.userStats.withingsAuth && manual) return this.withingsAuth()
		else if (!this.userStats.withingsAuth) return

		if (Object.keys(this.userStats.withingsAuth).length === 0 && manual) return this.withingsAuth()
		else if (Object.keys(this.userStats.withingsAuth).length === 0) return

		// console.log(this.userStats.withingsAuth)
		let params = new URLSearchParams()
		params.set(
			"access_token",
			this.userStats.withingsAuth ? this.userStats.withingsAuth["access_token"] : "none",
		)
		params.set("action", "getmeas")
		params.set("Uid", this.authService.getUID())
		params.set("date", this.userStats.todaysDate)

		let url = this.withingsDataUrl + params.toString()
		this.http.get(url).subscribe(
			res => {
				if (res["response"]["status"] == 401) this.refreshToken()
			},
			err => {
				console.log(err)
			},
		)
	}

	public refreshToken() {
		if (!this.userStats.withingsAuth) return this.withingsAuth()
		if (Object.keys(this.userStats.withingsAuth).length === 0) return this.withingsAuth()

		let params = new URLSearchParams()
		params.set("RefreshToken", this.userStats.withingsAuth["refresh_token"] || "none")
		params.set("Uid", this.authService.getUID() || "none")
		
		let url = this.withingsRefreshTokenUrl + params.toString()
		this.http.get(url).subscribe(
			() => {
				// console.log(res)
				this.fetchBPdata()
			},
			err => {
				console.log(err)
			},
		)
	}
}
