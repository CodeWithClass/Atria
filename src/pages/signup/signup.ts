import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { MyStatsPage } from '../mystats/mystats';
import { AuthService } from '../../services/auth.service';
import { UserStatsProvider } from '../../providers/user-stats/user-stats'
import { DBService } from '../../services/db.service'
import { HomePage } from '../home/home';

@Component({
  selector: 'as-page-signup',
  templateUrl: './signup.html'
})
export class SignupPage {
  signupError: string;
  form: FormGroup;
  mystats = {age: 0, fname: '', lname: '', goalCalories: 0, heightFeet: " ", heightInches: ""}

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
        this.userStats.userStatsConatiner = this.mystats;
        this.dbService.writeStatsToDB(this.mystats);
        this.navCtrl.setRoot(HomePage);
        this.navCtrl.push(MyStatsPage);

      },
      error => this.signupError = error.message
    );
  }
}