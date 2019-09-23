import { Component } from "@angular/core"
import { IonicPage, NavController, NavParams } from "ionic-angular"
import { FormBuilder, FormGroup } from "@angular/forms"
import { DBService } from "../../services/db.service"
import { BPService } from "../../services/bp.service"
import { UserStatsProvider } from "../../services/user.stats"
import { HomePage } from "../home/home"

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: "page-welcome",
	templateUrl: "welcome.html",
})
export class WelcomePage {
	getStarted: boolean = true
	personalDetails: boolean = false
	withings: boolean = false
	withingsAuth: boolean = false
	form: FormGroup
	googlePlayUrl: string = "https://play.google.com/store/apps/details?id=com.withings.wiscale2&hl=en"
	stats = { age: 0, fname: "", lname: "", goalCalories: 2000, heightFeet: "", heightInches: "" }

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public fb: FormBuilder,
		public dbService: DBService,
		public bpService: BPService,
		public userStats: UserStatsProvider,
	) {
		this.form = fb.group({
			fname: "",
			lname: "",
			age: "",
			heightFeet: "",
			heightInches: "",
			goalCalories: "",
		})
	}

	ionViewDidLoad() {}

	public push(page) {
		this.getStarted = this.personalDetails = this.withings = this.withingsAuth = false

		switch (page) {
			case "getStarted":
				this.getStarted = true
				break
			case "personalDetails":
				this.personalDetails = true
				break
			case "withings":
				this.withings = true
				break
			case "withingsAuth":
				this.withingsAuth = true
				break
		}
	}
	savePersonalDetails(page) {
		let data = this.form.value
		for (var key in data) {
			if (!data[key]) data[key] = this.stats[key]
		}

		console.log(data)
		this.dbService.writeStatsToDB(data)
		return this.push(page)
	}

	goToPlayStore() {
		window.open(this.googlePlayUrl, "_system")
		return
	}

	getWithingsAuth() {
		this.bpService.withingsAuth()
	}

	done() {
		let withingsAuth = false

		if (this.userStats.withingsAuth) withingsAuth = true

		this.dbService.user({ completedWelcome: true, withingsAuth }) //check if auth and write to db
		this.navCtrl.setRoot(HomePage, {}, { animate: true, direction: "forward" })
	}
}
