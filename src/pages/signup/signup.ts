import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NavController, Events } from 'ionic-angular'
import { AuthService } from '../../services/auth.service'
import { UserStatsProvider } from '../../services/user.stats'
import { DBService } from '../../services/db.service'
import { WelcomePage } from '../welcome/welcome'
import { LoginPage } from '../login/login'

@Component({
  selector: 'page-signup',
  templateUrl: './signup.html'
})
export class SignupPage {
  signupError: string
  form: FormGroup
  mystats = {
    age: 0,
    fname: '',
    lname: '',
    goalCaloriesIn: 2000,
    heightFeet: ' ',
    heightInches: ''
  }

  constructor(
    fb: FormBuilder,
    private navCtrl: NavController,
    private events: Events,
    private auth: AuthService,
    public userStats: UserStatsProvider,
    public dbService: DBService
  ) {
    this.form = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ],
      confirmPassword: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    })
  }

  ionViewDidLoad() {
    this.events.publish('signUpLoaded')
  }

  public signup() {
    let data = this.form.value
    let credentials = {
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword
    }
    this.auth.signUp(credentials).then(
      () => {
        this.navCtrl.setRoot(WelcomePage)
      },
      error => (this.signupError = error.message)
    )
  }

  public pushPage(page) {
    if (page === 'login') return this.navCtrl.push(LoginPage)
    return
  }
}
