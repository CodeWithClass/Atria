import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { URLSearchParams } from '@angular/http'
import { UserStatsProvider } from './user.stats'
import { DBService } from './db.service'
import { AuthService } from './auth.service'
@Injectable()

export class FitbitService {
    private client_id: string = "22DKK3"
    private client_secret: string = "c50cacfa8b8cab58aac60e02c6d0fc16"
    private redirect_uri: string = "https://atria.coach/api/fitbit/auth"
    private fitbitAuthURL: string = "https://www.fitbit.com/oauth2/authorize?"
    private fitbitRefreshUri: string = "https://api.fitbit.com/oauth2/token?"
    private response_type: string = "code"
    private scope = 'activity heartrate location nutrition profile settings sleep social weight'
    private expires_in: string =''

    constructor(private http: HttpClient,
        public inAppBrowser: InAppBrowser,
        public userStats: UserStatsProvider,
        public dbService: DBService,
        public authService: AuthService,
    ) {}

    public fitbitAuth() {
        let params = new URLSearchParams();
        params.set("client_id", this.client_id)
        params.set("response_type", this.response_type)
        params.set("redirect_uri", this.redirect_uri)
        params.set("scope", this.scope)
        // params.set("state", this.authService.getUID())
        

        const browser = this.inAppBrowser.create(this.fitbitAuthURL + params.toString(), "_self");
        try {
            browser.on('exit').subscribe(event => {
            });
        }
        catch (e) {
            console.log(e)
        }
    }
}