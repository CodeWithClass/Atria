import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { FormBuilder, FormGroup } from '@angular/forms'
import { DBService } from '../../services/db.service'
import { BPService } from '../../services/bp.service'
import { FitbitService } from '../../services/fitbit.service'
import { UserStatsProvider } from '../../services/user.stats'
import { HomePage } from '../home/home'
import _ from 'lodash'
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {
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
    heightFeet: '0',
    heightInches: '0',
    activityLevel: '0',
    healthGoal: 'None'
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb: FormBuilder,
    public dbService: DBService,
    public bpService: BPService,
    public fbService: FitbitService,
    public userStats: UserStatsProvider
  ) {
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

  ionViewDidLoad() {}

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
  healthGoalChange(healthGoal) {
    return _.set(this.stats, 'healthGoal', healthGoal)
  }

  savePersonalDetails(page) {
    let data = this.AuditData(this.stats, this.form.value)
    const goalCaloriesIn = _.round(this.calcTDEE(data)) || 2000

    _.set(data, 'goalCaloriesIn', goalCaloriesIn)

    this.dbService.writeStatsToDB(data)
    this.push(page)

    return
  }

  AuditData = (baseObj: object, donorObj: object) => {
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

  calcTDEE(data) {
    /*Mifflin = (10.m + 6.25h - 5.0a) + s
    m is mass in kg, h is height in cm, a is
     age in years, s is +5 for males and -151 
     for females*/
    const weight = parseInt(data.weight)
    const age = parseInt(data.age)
    const heightFeet = parseInt(data.heightFeet.replace(/\D/g, ''))
    const heightInches = parseInt(data.heightInches.replace(/\D/g, ''))
    const { gender, activityLevel, healthGoal } = data

    //convert to metric
    const heightcm = (heightFeet * 12 + heightInches) * 2.54
    const weightKg = weight / 2.2 //lbs to kg
    const genderInt = gender === 'Male' ? 5 : -151

    // prettier-ignore
    let TDEE: number = ((10*weightKg) + (6.25*heightcm) - (5*age)) + genderInt
    if (activityLevel === '5 - 7 days per week') TDEE = TDEE * 2
    if (activityLevel === '3 - 4 days per week') TDEE = TDEE * 1.6
    if (activityLevel === '1 - 2 days per week') TDEE = TDEE * 1.3

    return this.calcGoalCalories(TDEE, healthGoal)
  }

  calcGoalCalories(TDEE, healthGoal) {
    if (healthGoal === 'Lose weight') return TDEE - 500
    if (healthGoal === 'Gain weight') return TDEE + 500
    return TDEE
  }

  goToPlayStore(app) {
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
