import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { FormBuilder, FormGroup } from '@angular/forms'
import { DBService } from '../../services/db.service'
import { BPService } from '../../services/bp.service'
import { FitbitService } from '../../services/fitbit.service'
import { UserStatsProvider } from '../../services/user.stats'
import { HomePage } from '../home/home'

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {
  getStarted: boolean = true
  personalDetails: boolean = false
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
    age: 0,
    fname: '',
    lname: '',
    goalCaloriesIn: 2000,
    goalCaloriesOut: 500,
    heightFeet: '',
    heightInches: ''
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
      age: '',
      heightFeet: '',
      heightInches: '',
      goalCaloriesIn: '',
      goalCaloriesOut: ''
    })
  }

  ionViewDidLoad() {}

  public push(page) {
    this.getStarted = this.personalDetails = this.withings = this.withingsAuth = false

    switch (page) {
      case 'getStarted':
        this.getStarted = true
        break
      case 'personalDetails':
        this.personalDetails = true
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
      case 'fibitAuth':
        this.fitbitAuth = true
        break
    }
  }
  savePersonalDetails(page) {
    let data = this.form.value
    for (var key in data) {
      if (!data[key]) data[key] = this.stats[key]
    }

    console.log(data)
    this.dbService.writeStatsToDB(data)
    return this.push(page)
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
    let withingsAuth = false

    if (this.userStats.withingsAuth) withingsAuth = true

    this.dbService.user({ completedWelcome: true, withingsAuth }) //check if auth and write to db
    this.navCtrl.setRoot(HomePage, {}, { animate: true, direction: 'forward' })
  }
}
