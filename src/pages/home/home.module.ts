import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoundProgressModule, RoundProgressConfig } from 'angular-svg-round-progressbar'; 
import { HomePage } from './home';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    RoundProgressModule, 
  ],
  exports: [RoundProgressModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePageModule {
  constructor(private _config: RoundProgressConfig) {
    _config.setDefaults({
     
    });
  }
}
