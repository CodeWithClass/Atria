import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, App } from 'ionic-angular'
import { SignupPage } from '../signup/signup'
import { AuthService } from '../../services/auth.service'
import { AngularFireAuth } from 'angularfire2/auth'
import { FitbitService } from '../../services/fitbit.service'
import { AngularFireDatabase } from 'angularfire2/database'
import { DBService } from '../../services/db.service'
import { WelcomePage } from '../welcome/welcome'

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public app: App,
    public auth: AuthService,
    public afAuth: AngularFireAuth,
    public dbService: DBService,
    public fbService: FitbitService
  ) {}

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

  fitbitAuth() {
    return this.fbService.Auth()
  }

  public revokefitbitAuth() {
    return this.fbService.revokeAuth()
  }

  public fitbitAuthStatus() {
    return this.fbService.getAuthStatus()
  }
}
