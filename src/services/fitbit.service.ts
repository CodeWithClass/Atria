import { Injectable } from '@angular/core'
import 'rxjs/add/operator/map'
import { InAppBrowser } from '@ionic-native/in-app-browser'
import { URLSearchParams } from '@angular/http'
import { UserStatsProvider } from './user.stats'
import { DBService } from './db.service'
import { AuthService } from './auth.service'
@Injectable()
export class FitbitService {
    private client_id: string = '22DKK3'
    private redirect_uri: string = 'https://atria.coach/api/fitbit/auth'
    private fitbitAuthURL: string = 'https://www.fitbit.com/oauth2/authorize?'
    private response_type: string = 'code'
    private scope =
        'activity heartrate location nutrition profile settings sleep social weight'

    constructor(
        public inAppBrowser: InAppBrowser,
        public userStats: UserStatsProvider,
        public dbService: DBService,
        public authService: AuthService
    ) {}

    public Auth() {
        let params = new URLSearchParams()
        params.set('client_id', this.client_id)
        params.set('response_type', this.response_type)
        params.set('redirect_uri', this.redirect_uri)
        params.set('scope', this.scope)
        params.set('state', this.authService.getUID())

        console.log(this.fitbitAuthURL + params.toString())
        const browser = this.inAppBrowser.create(
            this.fitbitAuthURL + params.toString(),
            '_self'
        )
        try {
            browser.on('exit').subscribe(() => {})
        } catch (e) {
            console.log(e)
        }
    }
}
