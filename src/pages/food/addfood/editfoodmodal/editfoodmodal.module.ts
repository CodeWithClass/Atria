import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditfoodModal } from './editfoodmodal';

@NgModule({
  declarations: [
    EditfoodModal,
  ],
  imports: [
    IonicPageModule.forChild(EditfoodModal),
  ],
})
export class EditfoodModalModule {}
