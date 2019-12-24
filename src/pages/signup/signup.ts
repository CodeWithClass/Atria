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
  emailErr: string = ''
  isEmailErr: boolean = false

  passwordErr: string = ''
  isPasswordErr: boolean = false

  confPasswordError: string = ''
  isConfPasswordError: boolean = false

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
      email: [''],
      password: [''],
      confirmPassword: ['']
    })
  }

  ionViewDidLoad() {
    this.events.publish('signUpLoaded')
  }

  public checkEmail(ema: string) {}

  public checkPassword(pass: string, confPass: string) {
    if (!confPass) {
      this.signupError = ''
      this.confPasswordError = ''
      this.isPasswordErr = false
      return false
    }
    if (pass === confPass) {
      this.signupError = ''
      this.confPasswordError = ''
      this.isConfPasswordError = false
      return true
    }
    this.signupError = 'Passwords must match'
    this.isConfPasswordError = true
    this.isPasswordErr = true

    return false
  }

  public signup() {
    let data = this.form.value
    if (!this.checkPassword(data.password, data.confirmPassword)) return

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

  public pushPage(page: string) {
    if (page === 'login') return this.navCtrl.push(LoginPage)
    return
  }
}
