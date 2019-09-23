import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core"
import { IonicPageModule } from "ionic-angular"
import { RoundProgressModule } from "angular-svg-round-progressbar"
import { FoodPage } from "./food"

@NgModule({
	declarations: [FoodPage],
	imports: [IonicPageModule.forChild(FoodPage), RoundProgressModule],
	exports: [RoundProgressModule],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FoodPageModule {
	constructor() {}
}
