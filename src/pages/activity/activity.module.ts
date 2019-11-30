import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { RoundProgressModule } from 'angular-svg-round-progressbar'
import { ActivityPage } from './activity'

@NgModule({
  declarations: [ActivityPage],
  imports: [IonicPageModule.forChild(ActivityPage), RoundProgressModule]
})
export class ActivityPageModule {}
