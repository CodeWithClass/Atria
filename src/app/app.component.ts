import _ from 'lodash'
import { Component } from '@angular/core'
import { Platform } from 'ionic-angular'
import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'
import { AuthService } from '../services/auth.service'
import { DBService } from '../services/db.service'

// import { TabsPage } from '../pages/tabs/tabs';
import { SignupPage } from '../pages/signup/signup'
import { HomePage } from '../pages/home/home'
import { WelcomePage } from '../pages/welcome/welcome'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage
  public showSplash: boolean = true

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private auth: AuthService,
    private dbServ: DBService
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.splashScreen.show()
      this.auth.afAuth.authState.subscribe(
        user => {
          if (user) {
            this.dbServ.loadDBdata(data => {
              this.showSplash = false
              this.splashScreen.hide()

              if (_.get(data, 'user.completedWelcome', false))
                return (this.rootPage = HomePage)
              return (this.rootPage = WelcomePage)
            })
          } else {
            this.rootPage = SignupPage
          }
          setTimeout(() => {
            this.showSplash = false
            this.splashScreen.hide()
          }, 500)
        },
        () => {
          setTimeout(() => {
            this.showSplash = false
            this.splashScreen.hide()
          }, 500)
          this.rootPage = SignupPage
        }
      )
    })
  }
}
