import { Component } from "@angular/core"
import { IonicPage, NavController, NavParams, ModalController } from "ionic-angular"
import { addmealPage } from "../addmeal/addmeal"
import { FoodServiceProvider } from "../../../services/food.service"
import { UserStatsProvider } from "../../../services/user.stats"
import { DBService } from "../../../services/db.service"
// import { AddFoodModal } from './addmeal/addfoodmodal/addfoodmodal';
import { EditfoodModal } from "../editfoodmodal/editfoodmodal"
/**
 * Generated class for the AddfoodPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: "page-addfood",
	templateUrl: "addfood.html",
})
export class AddFoodPage {
	addfoodDate: any = {}
	dateCounter = 0
	fullDate
	dateColor = "white"

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public modalCtrl: ModalController,
		public foodServ: FoodServiceProvider,
		public userStats: UserStatsProvider,
		public dbService: DBService,
	) {
		this.fullDate = new Date()
	}

	launchAddFoodSubPage(_pageTitle) {
		this.navCtrl.push(addmealPage, { PageTitle: _pageTitle }, { animate: true, direction: "forward" })
	}

	displayMeals(meal: string) {
		try {
			let allMealEntries = this.userStats.foodIntake

			let mealEntries = []
			allMealEntries = Object.values(allMealEntries[this.userStats.todaysDate][meal])

			//if there logged meals [not empty]
			if (allMealEntries.length > 0) {
				//take each of the meal entries
				allMealEntries.forEach(element => {
					if (element instanceof Array) {
						//check last array of each for matching meal
						let mealEntry = element[element.length - 1]

						if (mealEntry.meal == meal) {
							//if match, push to array to be returned
							mealEntries.push(mealEntry)
							// console.log(mealEntries)
						}
					}
				})

				return mealEntries
			}
		} catch (e) {}
	}

	delRecord(record, meal) {
		//get all food loaded food data
		let allMealEntries = this.userStats.foodIntake
		//filter foods logged today, and convert obj to array
		allMealEntries = Object.values(allMealEntries[this.userStats.todaysDate][meal])
		let metaData
		// let _element

		allMealEntries.forEach(element => {
			console.log(element)
			//convert obj to arr
			element = Object.values(element)

			//get entire record then get the last element of said record
			metaData = element[element.length - 1]

			//if the both the uid of the record and element matches (date is just extra checking)
			if (metaData.uid == record["uid"] && metaData.date == this.userStats.todaysDate) {
				this.dbService.removeFromDB(metaData.date, metaData.meal, metaData.name)
				this.delRecordNut(element)
			}
			// else
			// counter++;
		})
	}

	delRecordNut(record) {
		let statRecord = this.userStats.userDailyStats[this.userStats.todaysDate]["nutrients"]
		//pop last record into metaData
		let metaData = record.pop()
		console.log(metaData)
		//for each elment in the record subtract its value from the total
		console.log(record)
		record.forEach(element => {
			statRecord[element.name] -= element.value * metaData["servings"]
		})
		//call db service to write new nutrition stats
		this.dbService.writeDailyStatsToDB(metaData.date, statRecord, "nutrients")
	}

	changeDay(timeTravel) {
		//depending on the argument, either decrement or increment the date
		if (timeTravel == "past") {
			this.fullDate.setDate(this.fullDate.getDate() - 1)
			this.addfoodDate =
				this.fullDate.getFullYear() +
				"-" +
				(this.fullDate.getMonth() + 1) +
				"-" +
				this.fullDate.getDate()
			this.userStats.todaysDate = this.addfoodDate
		} else if (timeTravel == "future") {
			this.fullDate.setDate(this.fullDate.getDate() + 1)
			this.addfoodDate =
				this.fullDate.getFullYear() +
				"-" +
				(this.fullDate.getMonth() + 1) +
				"-" +
				this.fullDate.getDate()
			this.userStats.todaysDate = this.addfoodDate
		}

		//if the date is not == today's date change the date to red
		if (this.userStats.todaysDate != this.userStats.ABSOLUTE_DATE) {
			this.dateColor = "#ff2626"
		} else {
			this.dateColor = "white"
		}
	}

	reopenFoodModal(_foodrecord) {
		let editModal = this.modalCtrl.create(EditfoodModal, { PageTitle: "Edit", Record: _foodrecord })
		editModal.present()
	}
}
