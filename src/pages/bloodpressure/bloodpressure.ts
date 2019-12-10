import { Component, ViewChild } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { BaseChartDirective } from 'ng2-charts/ng2-charts'
import { ManualbpPage } from './manualbp/manualbp'
import { BPService } from '../../services/bp.service'
import { UserStatsProvider } from '../../services/user.stats'
import { bpChartProperties } from '../../helpers/charts'

@IonicPage()
@Component({
  selector: 'page-bloodpressure',
  templateUrl: 'bloodpressure.html'
})
export class BloodPressurePage {
  @ViewChild(BaseChartDirective) public chart: BaseChartDirective
  public chartData = {
    systolic: {
      label: 'Systolic',
      data: []
    },
    diastolic: {
      label: 'Diastolic',
      data: []
    }
  }
  public bpChartProps = bpChartProperties
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userStats: UserStatsProvider,
    public bpService: BPService // public inAppBrowser: InAppBrowser
  ) {
    this.chartData.systolic.data = this.userStats.bpMetrics.map(each => {
      return each.measurement.systolic || 0
    })
    this.chartData.diastolic.data = this.userStats.bpMetrics.map(each => {
      return each.measurement.diastolic || 0
    })

    //ensure only last 4 readings
    // let noOfBpReadings = this.userStats.bpMetrics.length
    // myChartData[0].data.slice(noOfBpReadings - 4, noOfBpReadings -1)
    // myChartData[1].data.slice(noOfBpReadings - 4, noOfBpReadings- 1)
  }

  // line chart events
  // public chartClicked(e: any): void {
  //   console.log(e)
  // }

  // public chartHovered(e: any): void {
  //   console.log(e);
  // }

  bpAuth() {
    return this.bpService.withingsAuth()
  }

  fetchBPdata(manual) {
    return this.bpService.fetchBPdata(manual)
  }

  launchManualAdd() {
    this.navCtrl.push(ManualbpPage, {}, { animate: true, direction: 'forward' })
  }

  ngAfterViewInit() {}

  ionViewDidLoad() {}

  public refresh() {
    this.bpService.fetchBPdata(true)
    this.chart.ngOnChanges({})
  }
}
