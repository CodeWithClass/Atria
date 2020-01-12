import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import _ from 'lodash'
import { SettingsPage } from '../settings/settings'
import { DBService } from '../../services/db.service'
import { AngularFireDatabase } from 'angularfire2/database'
import { UserStatsProvider } from '../../services/user.stats'
import { calcTDEE, calcAge } from '../../helpers/calculate'
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
    heightFeet: '',
    heightInches: '',
    weight: 0,
    gender: 'Male',
    activityLevel: ''
  }
  isValidateErr: boolean = false

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fdb: AngularFireDatabase,
    public dbService: DBService,
    public userStats: UserStatsProvider
  ) {
    this.validate()
  }

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
      this.mystats.age = calcAge(this.mystats.dob)
      this.mystats.goalCaloriesIn = _.round(calcTDEE(this.mystats))
    } else this.isValidateErr = true
  }

  saveData() {
    this.dbService.writeStatsToDB(this.mystats)
    this.navCtrl.pop()
  }
}
