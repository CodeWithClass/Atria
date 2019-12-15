import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { BloodPressurePage } from './bloodpressure'
import { ChartsModule } from 'ng2-charts'
import { ComponentsModule } from '../../components/components.module'

@NgModule({
  declarations: [BloodPressurePage],
  imports: [
    IonicPageModule.forChild(BloodPressurePage),
    ChartsModule,
    ComponentsModule
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BloodPressurePageModule {}
