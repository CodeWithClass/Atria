import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoundProgressModule, RoundProgressConfig } from 'angular-svg-round-progressbar'; 
import { HomePage } from './home';

@NgModule({
  declarations: [
    HomePage, RoundProgressModule
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
  
}
