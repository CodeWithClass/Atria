import { Component } from '@angular/core'
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from 'ionic-angular'
import { FoodServiceProvider } from '../../../services/food.service'
import { UserStatsProvider } from '../../../services/user.stats'
import { DBService } from '../../../services/db.service'

/**
 * Generated class for the EditfoodmodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editfoodmodal',
  templateUrl: 'editfoodmodal.html'
})
export class EditfoodModal {
  pageTitle
  ndbno
  record = this.navParams.get('Record')
  completeRecord = []
  name = this.record.name
  manu = this.record.manu
  NoOfServ = parseFloat(this.record.servings)
  showMicroNutrients = false

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public foodServ: FoodServiceProvider,
    public userStats: UserStatsProvider,
    public dbService: DBService
  ) {
    this.pageTitle = navParams.get('PageTitle')
    // console.log(this.navParams.get('Record'))
  }

  calcServings(event) {
    if (!event.value) return

    this.NoOfServ = this.NoOfServ * (event.value / this.NoOfServ)
    return this.NoOfServ
  }

  /*
	Function: getMacroData(_macro)
	Parameter: _macro
	Return: number
	
  Accepts a string (_macro) and checks if fooServ.foodNutdata exists. 
  If foodNutdata exists then searches foofNutdata for an element
  who's name element and returns that element's value as a number.
  */
  getMacroData(_macro: string) {
    let macro
    let recordData = this.findRecordData(this.record)

    //remove last element which has the meta data
    // recordData.pop();

    try {
      macro = recordData.find(element => {
        return element.name == _macro
      })

      if (macro) {
        return parseFloat(macro.value) * this.NoOfServ
      } else {
        return 0
      }
    } catch (err) {
      console.log(err)
    }
  }

  /*
	Function: getAllNutrients(record, prop)
	Parameter: record, prop
	Return: number
	
  Accepts an object (record) and string (prop) and checks if prop
  is eq to value. If it is, then it returns nutrient.value mulitplied
  by the number of servings (NoOfServ). Else it returns the nutrient.prop.
    */
  getAllNutrients(record, prop) {
    if (prop == 'value' && record.value) {
      return parseFloat(record.value) * this.NoOfServ
    } else {
      return record[prop]
    }
  }

  /*
	Function: getServMeasure()
	Parameter: none
  Return: string
  
  Checks if foodServ.measures exists.
  If it does, then return the measurement quantity, label, 
  the eqv value and eqv unit.
  Also formats OZA (returned from USDA API) to oz

  */
  getServMeasure() {
    let servMes

    try {
      let servMesArr = this.completeRecord[0].measures[0]

      if (servMesArr.label == 'OZA' || servMesArr.label == 'ONZ')
        servMesArr.label = 'oz'

      servMes =
        servMesArr.qty +
        ' ' +
        servMesArr.label +
        ' (' +
        servMesArr.eqv +
        servMesArr.eunit +
        ')'
      return servMes
    } catch (e) {}
  }

  /*
	Function: findRecordData(record)
	Parameter: Object
  Return: Object of Arrays
  
  Finds and retreives 
  the record we are trying to access  */

  findRecordData(record) {
    //get the food loaded food data for today's date
    let relavantMealEntries = this.userStats.foodIntake[
      this.userStats.todaysDate
    ][this.record.meal]
    //convert obj to array
    relavantMealEntries = Object.values(relavantMealEntries)
    let metaData
    let _element = []
    let counter: number

    relavantMealEntries.forEach(element => {
      element = Object.values(element)

      //get entire record then get the last element of said record
      metaData = element[element.length - 1]

      //if the both the uid of the record and arr element matches (date is just extra checking)
      if (
        metaData.uid == record['uid'] &&
        metaData.date == this.userStats.todaysDate
      ) {
        this.completeRecord = _element = element
        return
      } else counter++
    })
    return _element
  }

  /*
	Function: updateRecordNut(record)
	Parameter: Array
  Return: Array
  
  Gets todays userstats then decrements the current record (to be re-added)
  */
  updateRecordNut(record) {
    let statRecord
    if (this.userStats.userDailyStats[this.userStats.todaysDate]) {
      statRecord = this.userStats.userDailyStats[this.userStats.todaysDate][
        'nutrients'
      ]
    }

    let metaData = record[record.length - 1]

    //for each elment in the record subtract its value from the total
    record.forEach(element => {
      try {
        //ensure it is not food's name being decremented (causes NaN err)
        if (element.name != this.name)
          statRecord[element.name] -= element.value * metaData['servings']
      } catch (err) {
        console.log(err)
      }
    })
    return statRecord
  }

  /*
	Function: toggleMicroNutrients()
	Parameter: none
  Return: none
  
  Inverts the value of showMicroNutrients when called.
  showMicroNutrients is delcared initially as false.
  */
  toggleMicroNutrients() {
    this.showMicroNutrients = !this.showMicroNutrients
  }

  /*
	Function: toggleMicroNutrients()
	Parameter: none
  Return: none
  
  Create date variable and pass today's date yyyy/mm/dd,
  then push to foodNutdata array as object property 'date'.
  Push foodNutdata to foodIntake array, then closes the foodModal.
  */
  saveAndCloseModal() {
    this.record.date = this.userStats.todaysDate
    // this.record.meal = this.pageTitle;
    let statRecord = this.updateRecordNut(this.completeRecord)

    //update serving size of selected food
    this.completeRecord.forEach(element => {
      let lastArrElement = this.completeRecord[this.completeRecord.length - 1]
      if (element.name == 'Energy') {
        lastArrElement.calories = parseFloat(element.value) * this.NoOfServ || 0
        lastArrElement.servings = this.NoOfServ
        lastArrElement.uid = Math.random()
      }

      if (element.name == 'Sodium, Na') {
        let color = 'black'
        let value = parseFloat(element.value) * this.NoOfServ

        if (
          (value > 500 && element.unit == 'mg') ||
          (value > 50 && element.unit == 'g')
        )
          color = 'red'
        else if (
          (value > 299 && element.unit == 'mg') ||
          (value > 29 && element.unit == 'g')
        )
          color = 'orange'

        lastArrElement.sodium = {
          value: value || 0,
          unit: element.unit.toLowerCase() || 'mg',
          color: color
        }
      }

      //convert the values to type number
      element.value = parseFloat(element.value) || 0

      //check if element already exits or if name is not food's name
      if (!statRecord[element.name] && element.name != this.name) {
        statRecord[element.name] = 0
      }
      //check if name is not food's name
      if (element.name != this.name) {
        statRecord[element.name] += element.value * this.NoOfServ
      }
    })

    this.dbService.writeFoodToDB(
      this.record.date,
      this.record.meal,
      this.record.name,
      this.completeRecord
    )
    this.dbService.writeDailyStatsToDB(
      this.record.date,
      statRecord,
      'nutrients'
    )

    this.closeModal()
  }

  strCleanUp(str) {
    let STR = str.replace(/:[.#$\[\]\///\._]/g, ' ')
    return STR
  }

  /*
	Function: closeModal()
	Parameter: none
  Return: none

  Closes the modal when called.
  */
  closeModal() {
    this.viewCtrl.dismiss()
  }
}
