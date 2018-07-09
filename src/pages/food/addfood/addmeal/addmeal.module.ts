import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { addmealPage } from './addmeal';

@NgModule({
  declarations: [
    addmealPage,
  ],
  imports: [
    IonicPageModule.forChild(addmealPage),
  ],
})
export class addmealPageModule {}
