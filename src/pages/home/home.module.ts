import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { RoundProgressModule } from 'angular-svg-round-progressbar'
import { ChartsModule } from 'ng2-charts'
import { HomePage } from './home'
import { ComponentsModule } from '../../components/components.module'

@NgModule({
  declarations: [HomePage],
  imports: [
    IonicPageModule.forChild(HomePage),
    RoundProgressModule,
    ChartsModule,
    ComponentsModule
  ],
  exports: [RoundProgressModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule {
  constructor() {}
}
