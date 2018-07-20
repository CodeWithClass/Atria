import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RoundProgressModule, RoundProgressConfig } from 'angular-svg-round-progressbar'; 
import { FoodPage } from './food';

@NgModule({
  declarations: [
    FoodPage
  ],
  imports: [
    IonicPageModule.forChild(FoodPage),
    RoundProgressModule,
  ],
  exports: [RoundProgressModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FoodPageModule {
  constructor(private _config: RoundProgressConfig) {
    _config.setDefaults({

    });
  }
}
