import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DBService } from '../../../services/db.service'
import { UserStatsProvider } from '../../../providers/user-stats/user-stats'



@IonicPage()
@Component({
  selector: 'page-manualbp',
  templateUrl: 'manualbp.html',
})
export class ManualbpPage {
  
  bpMetrics = this.userStats.bpMetrics; 
  systolic = null;
  diastolic = null;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public dbService: DBService,
              public userStats: UserStatsProvider,
            ) {
  }
  
  public addData(){
    this.bpMetrics[0]['data'].push(this.systolic)
    this.bpMetrics[1]['data'].push(this.diastolic)

    this.dbService.writeDailyStatsToDB(this.userStats.todaysDate, this.bpMetrics, 'bp')
  }
}
