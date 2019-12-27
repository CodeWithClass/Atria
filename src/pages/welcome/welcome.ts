import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular'
import { FormBuilder, FormGroup } from '@angular/forms'
import _ from 'lodash'
import { DBService } from '../../services/db.service'
import { BPService } from '../../services/bp.service'
import { FitbitService } from '../../services/fitbit.service'
import { UserStatsProvider } from '../../services/user.stats'
import { HomePage } from '../home/home'
import { calcTDEE } from '../../helpers/calories'
import {
  ageValidation,
  weightValidation,
  nameValidation,
  notBlank
} from '../../helpers/validators'
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {
  completedWelcome: boolean = false
  getStarted: boolean = true
  personalDetails: boolean = false
  healthGoal: boolean = false
  withings: boolean = false
  withingsAuth: boolean = false
  fitbit: boolean = false
  fitbitAuth: boolean = false
  form: FormGroup
  withingPlaystoreUrl: string =
    'https://play.google.com/store/apps/details?id=com.withings.wiscale2&hl=en'
  fitbitPlaystorUrl: string =
    'https://play.google.com/store/apps/details?id=com.fitbit.FitbitMobile&hl=en'
  stats = {
    fname: 'Jon',
    lname: 'Doe',
    age: 99,
    gender: 'Male',
    goalCaloriesIn: 2000,
    goalCaloriesOut: 500,
    weight: '0',
    heightFeet: '0',
    heightInches: '0',
    activityLevel: '',
    healthGoal: 'None'
  }
  validateErr: string = ''
  isValidateErr: boolean = true

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public fb: FormBuilder,
    public dbService: DBService,
    public bpService: BPService,
    public fbService: FitbitService,
    public userStats: UserStatsProvider
  ) {
    this.completedWelcome = _.get(
      this.userStats.allData,
      'user.completedWelcome',
      false
    )
    this.form = fb.group({
      fname: '',
      lname: '',
      gender: '',
      age: '',
      weight: '',
      heightFeet: '',
      heightInches: '',
      activityLevel: ''
    })
  }

  ionViewDidLoad() {
    this.events.publish('welcomeLoaded')
  }

  public push(page) {
    this.getStarted = false
    this.personalDetails = false
    this.healthGoal = false
    this.withings = false
    this.withingsAuth = false
    this.fitbit = false
    this.fitbitAuth = false

    switch (page) {
      case 'getStarted':
        this.getStarted = true
        break
      case 'personalDetails':
        this.personalDetails = true
        break
      case 'healthGoal':
        this.healthGoal = true
        break
      case 'withings':
        this.withings = true
        break
      case 'withingsAuth':
        this.withingsAuth = true
        break
      case 'fitbit':
        this.fitbit = true
        break
      case 'fitbitAuth':
        this.fitbitAuth = true
        break
    }
  }

  public popPage() {
    this.navCtrl.pop()
  }

  public validate(form: any) {
    const {
      fname,
      lname,
      gender,
      age,
      weight,
      heightFeet,
      heightInches,
      activityLevel
    } = form
    if (
      nameValidation(fname) &&
      nameValidation(lname) &&
      notBlank(gender) &&
      notBlank(heightFeet) &&
      notBlank(heightInches) &&
      notBlank(activityLevel) &&
      ageValidation(age) &&
      weightValidation(weight)
    ) {
      this.isValidateErr = false
    } else this.isValidateErr = true
  }

  healthGoalChange(healthGoal: string) {
    return _.set(this.stats, 'healthGoal', healthGoal)
  }

  savePersonalDetails(page: string) {
    let data = this.auditData(this.stats, this.form.value)
    const goalCaloriesIn = _.round(calcTDEE(data)) || 2000

    _.set(data, 'goalCaloriesIn', goalCaloriesIn)

    this.dbService.writeStatsToDB(data)
    this.push(page)

    return
  }

  auditData = (baseObj: object, donorObj: object) => {
    let data: object = {}
    _.forEach(baseObj, (val, key) => {
      val.toString().replace(/\W/g, '')
      if (donorObj[key]) {
        return _.set(data, key, donorObj[key])
      }
      return _.set(data, key, val)
    })

    return data
  }

  goToPlayStore(app: string) {
    if (app === 'withings')
      return window.open(this.withingPlaystoreUrl, '_system')
    else if (app === 'fitbit')
      return window.open(this.fitbitPlaystorUrl, '_system')
    return console.log('no url match for thirdparty')
  }

  getWithingsAuth() {
    this.bpService.withingsAuth()
  }

  getfitbitAuth() {
    this.fbService.Auth()
  }

  done() {
    this.dbService.user({
      completedWelcome: true
    })
    this.navCtrl.setRoot(HomePage, {}, { animate: true, direction: 'forward' })
  }
}
