import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import _ from 'lodash'
import { SettingsPage } from '../settings/settings'
import { DBService } from '../../services/db.service'
import { AngularFireDatabase } from 'angularfire2/database'
import { UserStatsProvider } from '../../services/user.stats'
import { calcTDEE, calcAge, calcGoalCaloriesOut } from '../../helpers/calculate'
import {
  ageValidation,
  weightValidation,
  nameValidation,
  calorieValidation,
  notBlank
} from '../../helpers/validators'

@IonicPage()
@Component({
  selector: 'page-mystats',
  templateUrl: 'mystats.html'
})
export class MyStatsPage {
  dataToAdd
  mystats = this.userStats.userStatsContainer || {
    age: 0,
    dob: '',
    fname: '',
    lname: '',
    goalCaloriesIn: 0,
    goalCaloriesOut: 0,
    heightFeet: '',
    heightInches: '',
    weight: 0,
    gender: 'Male',
    activityLevel: '',
    healthGoal: ''
  }
  isValidateErr: boolean = true

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fdb: AngularFireDatabase,
    public dbService: DBService,
    public userStats: UserStatsProvider
  ) {}

  launchSettings() {
    this.navCtrl.push(SettingsPage)
  }

  public validate() {
    const {
      fname,
      lname,
      gender,
      dob,
      weight,
      heightFeet,
      heightInches,
      goalCaloriesIn,
      activityLevel
    } = this.mystats
    if (
      nameValidation(fname) &&
      nameValidation(lname) &&
      notBlank(gender) &&
      notBlank(heightFeet) &&
      notBlank(heightInches) &&
      notBlank(activityLevel) &&
      calorieValidation(goalCaloriesIn) &&
      ageValidation(dob) &&
      weightValidation(weight)
    ) {
      this.isValidateErr = false
      this.calc()
    } else this.isValidateErr = true
  }

  calc() {
    this.mystats.age = calcAge(this.mystats.dob)
    this.mystats.goalCaloriesIn = _.round(calcTDEE(this.mystats))
    this.mystats.goalCaloriesOut = _.round(
      calcGoalCaloriesOut(this.mystats.goalCaloriesIn, this.mystats)
    )
  }

  saveData() {
    this.dbService.writeStatsToDB(this.mystats)
    this.navCtrl.pop()
  }
}
