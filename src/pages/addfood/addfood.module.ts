import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddFoodPage } from './addfood';

@NgModule({
  declarations: [
    AddFoodPage,
  ],
  imports: [
    IonicPageModule.forChild(AddFoodPage),
  ],
})
export class AddFoodPageModule {}
