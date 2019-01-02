import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { MyStatsPage } from '../mystats/mystats';
import { AuthService } from '../../services/auth.service';
import { UserStatsProvider } from '../../services/user.stats'
import { DBService } from '../../services/db.service'
import { HomePage } from '../home/home';
import { WelcomePage } from '../welcome/welcome';

@Component({
  selector: 'page-signup',
  templateUrl: './signup.html'
})
export class SignupPage {
  signupError: string;
  form: FormGroup;
  mystats = {age: 0, fname: '', lname: '', goalCalories: 2000, heightFeet: " ", heightInches: ""}

  constructor(
    fb: FormBuilder,
    private navCtrl: NavController,
    private auth: AuthService,
    public userStats: UserStatsProvider,
    public dbService: DBService,
  ) {
    this.form = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  public signup() {
    let data = this.form.value;
    let credentials = {
      email: data.email,
      password: data.password
    };
    this.auth.signUp(credentials).then(
      () => {
        // this.userStats.userStatsConatiner = this.mystats;
        // this.dbService.writeStatsToDB(this.mystats);
        this.dbService.user({completedWelcome: false, withingsAuth: false})
        this.navCtrl.setRoot(WelcomePage);
        // this.navCtrl.push(MyStatsPage);

      },
      error => this.signupError = error.message
    );
  }
}