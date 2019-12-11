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
    public bpService: BPService
  ) {
    const allSystolicEntries = this.userStats.bpData.map(each => {
      return each.measurement.systolic || 0
    })
    const allDiastolicEntries = this.userStats.bpData.map(each => {
      return each.measurement.diastolic || 0
    })
    //last 4 reading and reverse them for chart
    this.chartData.systolic.data = allSystolicEntries.slice(0, 4).reverse()
    this.chartData.diastolic.data = allDiastolicEntries.slice(0, 4).reverse()
  }

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
