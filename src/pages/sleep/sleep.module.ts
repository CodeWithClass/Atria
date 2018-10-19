import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SleepPage } from './sleep';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    SleepPage,
  ],
  imports: [
    IonicPageModule.forChild(SleepPage),
    ChartsModule
  ],
})
export class SleepPageModule {}
