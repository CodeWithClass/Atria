import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { SettingsPage } from '../settings/settings';
import { UserStatsProvider } from '../../services/user.stats';
import { DBService } from '../../services/db.service'
import { BPService } from '../../services/bp.service'
import { FoodPage } from "../food/food";
import { MyStatsPage } from '../mystats/mystats';
import { BloodPressurePage } from '../bloodpressure/bloodpressure';
import { SleepPage } from '../sleep/sleep';
import { WelcomePage } from '../welcome/welcome';



/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */ 

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  public sleepChartLabels: string[] = ['Deep Sleep', 'Light Sleep', 'Wake Sleep'];
  public sleepChartType: string = 'doughnut';
  public sleepChartColors: any[] = [{ backgroundColor: ["rgba(167,72,195,0.8)", "rgba(110,89,201,0.8)", "rgba(85,173,224,0.8)"] }];
  public sleepChartData: any[] = [350, 450, 100];
  public sleepTotal: number[] = [8,39];
  public sleepChartOptions: any= {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      arc: {
        borderWidth: 0
      }
    },
    legend: {
      display: false
    },
  }
  


  
  

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private NativePageTrans: NativePageTransitions,
              public userStats: UserStatsProvider,
              public dbServ: DBService,
              public bpServ: BPService) {
    
    this.bpServ.fetchBPdata()
    // this.dbServ.loadDBdata(() => { 
    //   this.bpServ.fetchBPdata()
    // })
 

  }


  public checkIfStats(){
    // console.log(this.userStats.userStatsConatiner['nodata'])
    if (this.userStats.userStatsConatiner['nodata'] == true){
      this.navCtrl.setRoot(MyStatsPage, {}, { animate: true, direction: 'forward' });
    }
    else{

    }
  }


  public pushFoodPage() {
    this.navCtrl.push(FoodPage, {}, { animate: true, direction: 'forward' });
  }

  public popFoodPage(){
    let options: NativeTransitionOptions = {
      direction: 'right',
      duration: 200,
      androiddelay: 10,
      iosdelay: 10
    };
    
    this.NativePageTrans.slide(options);
    this.navCtrl.pop();
  }

  public pushPage(page, swipe = {offsetDirection: 0}){
    let options: NativeTransitionOptions = {
      direction: 'left',
      duration: 200,
      androiddelay: 0,
      iosdelay: 0,
      // slowdownfactor: 23,

    };
    
    if (swipe.offsetDirection === 2 || swipe.offsetDirection === 0){
     
      if (page == 'bloodpressure') {
        this.navCtrl.push(BloodPressurePage, {}, { animate: true, direction: 'forward' });
      }
      else if(page == 'food'){
        this.navCtrl.push(FoodPage, {}, { animate: true, direction: 'forward' });  
      }
      else if(page == 'stats'){
        this.navCtrl.push(MyStatsPage, {}, { animate: true, direction: 'forward' });  
      }
      else if (page == 'sleep') 
        this.navCtrl.push(SleepPage, {}, { animate: true, direction: 'forward' });
        
      else if (page === 'welcome')
        this.navCtrl.push(WelcomePage, {}, { animate: true, direction: 'forward' });
        
        
  
    }
  }
  public chartClicked($event) { }


  launchSettings(){
    this.navCtrl.push(SettingsPage);
  }


}
