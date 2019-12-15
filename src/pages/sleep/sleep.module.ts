import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { SleepPage } from './sleep'
import { ChartsModule } from 'ng2-charts'
import { ComponentsModule } from '../../components/components.module'

@NgModule({
  declarations: [SleepPage],
  imports: [IonicPageModule.forChild(SleepPage), ChartsModule, ComponentsModule]
})
export class SleepPageModule {}
