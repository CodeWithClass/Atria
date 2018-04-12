import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyStatsPage } from './mystats';

@NgModule({
  declarations: [
    MyStatsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyStatsPage),
  ],
})
export class MystatsPageModule {}
