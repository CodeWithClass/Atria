import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddFoodModal } from './addfoodmodal';

@NgModule({
  declarations: [
    AddFoodModal,
  ],
  imports: [
    IonicPageModule.forChild(AddFoodModal),
  ],
})
export class AddfoodModalModule {}
