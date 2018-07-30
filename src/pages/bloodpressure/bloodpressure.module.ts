import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BloodPressurePage } from './bloodpressure';
import { RoundProgressModule, RoundProgressConfig } from 'angular-svg-round-progressbar'; 
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [ 
    BloodPressurePage,
  ],
  imports: [
    IonicPageModule.forChild(BloodPressurePage),
    RoundProgressModule,
    ChartsModule,
  ],
  exports: [
    RoundProgressModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class BloodPressurePageModule {
  constructor(private _config: RoundProgressConfig) {
    _config.setDefaults({

    });
  }
}
