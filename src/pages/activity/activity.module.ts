import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { RoundProgressModule } from 'angular-svg-round-progressbar'
import { ActivityPage } from './activity'
import { ComponentsModule } from '../../components/components.module'
@NgModule({
  declarations: [ActivityPage],
  imports: [
    IonicPageModule.forChild(ActivityPage),
    RoundProgressModule,
    ComponentsModule
  ]
})
export class ActivityPageModule {}
