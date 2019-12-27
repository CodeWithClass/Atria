import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, App } from 'ionic-angular'
import { SignupPage } from '../signup/signup'
import { AuthService } from '../../services/auth.service'
import { AngularFireAuth } from 'angularfire2/auth'
import { FitbitService } from '../../services/fitbit.service'
import { DBService } from '../../services/db.service'
import { WelcomePage } from '../welcome/welcome'

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  fitbitAuthStatus: boolean
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public app: App,
    public auth: AuthService,
    public afAuth: AngularFireAuth,
    public dbService: DBService,
    public fbService: FitbitService
  ) {
    this.fitbitAuthStatus = this.fbService.getAuthStatus()
  }

  logout() {
    this.dbService.loadDBdata(() => {
      this.afAuth.auth.signOut().then(() => {
        this.navCtrl.setRoot(SignupPage)
      })
    }, 'gracefulSignout')
  }

  public pushPage(page) {
    this.navCtrl.push(WelcomePage, {}, { animate: true, direction: 'forward' })
  }

  fibitToggle() {
    if (this.fitbitAuthStatus === false) return this.fbService.revokeAuth()
    if (this.fitbitAuthStatus === true) return this.fbService.Auth()
  }
}
