import _ from 'lodash'
import { Component } from '@angular/core'
import { Platform, Events } from 'ionic-angular'
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
    public events: Events,
    private auth: AuthService,
    private dbServ: DBService
  ) {
    if (this.platform.is('android')) this.statusBar.hide()
    platform.ready().then(() => {
      this.splashScreen.hide()

      this.auth.afAuth.authState.subscribe(
        user => {
          if (user) {
            this.dbServ.loadDBdata(data => {
              if (_.get(data, 'user.completedWelcome', false)) {
                this.rootPage = HomePage
                this.HideSplash('HomePage')
              } else {
                this.rootPage = WelcomePage
                this.HideSplash('WelcomePage')
              }
            })
          } else {
            this.rootPage = SignupPage
            this.HideSplash('SignupPage')
          }
        },
        () => {
          this.rootPage = SignupPage
          this.HideSplash('SignupPage')
        }
      )
      setTimeout(() => {
        this.HideSplash('') //just hide the thing
        console.log('just hide the thing')
      }, 4000)
    })
  }

  public HideSplash(rootPage) {
    if (!this.showSplash) return
    console.log('root ', rootPage)
    switch (rootPage) {
      case 'SignupPage':
        this.events.subscribe('signUpLoaded', () => {
          console.log('Signup Loaded')
          setTimeout(() => {
            this.showSplash = false
          }, 300)
        })
        break

      case 'WelcomePage':
        this.events.subscribe('welcomeLoaded', () => {
          console.log('Welcome Loaded')
          setTimeout(() => {
            this.showSplash = false
          }, 300)
        })
        break
      case 'HomePage':
        this.events.subscribe('homeLoaded', () => {
          console.log('Home Loaded')
          setTimeout(() => {
            this.showSplash = false
          }, 300)
        })
        break
      default:
        this.showSplash = false
    }
  }
}
