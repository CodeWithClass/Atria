import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddBreakfastPage } from './addbreakfast';

@NgModule({
  declarations: [
    AddBreakfastPage,
  ],
  imports: [
    IonicPageModule.forChild(AddBreakfastPage),
  ],
})
export class AddBreakfastPageModule {}
