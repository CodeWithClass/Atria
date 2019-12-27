import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { AddFoodPage } from './addfood'
import { ComponentsModule } from '../../../components/components.module'

@NgModule({
  declarations: [AddFoodPage],
  imports: [IonicPageModule.forChild(AddFoodPage), ComponentsModule]
})
export class AddFoodPageModule {}
