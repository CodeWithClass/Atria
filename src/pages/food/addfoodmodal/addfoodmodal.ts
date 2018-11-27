import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FoodServiceProvider } from '../../../services/food.service';
import { UserStatsProvider } from '../../../services/user.stats';
import { DBService } from '../../../services/db.service';

/**
 * Generated class for the AddfoodmodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */ 

@Component({
  selector: 'page-addfoodmodal',
  templateUrl: 'addfoodmodal.html',
})
export class AddFoodModal {
  pageTitle
  ndbno;
  record = this.navParams.get('Record');
  name = this.record.name
  manu = this.record.manu
  NoOfServ: number = 1;
  showMicroNutrients = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    public foodServ: FoodServiceProvider,
    public userStats: UserStatsProvider,
    public dbService: DBService,
  
  ) {
    this.pageTitle = navParams.get('PageTitle'); 
  }
  
 
  /*
	Function: getMacroData(_macro)
	Parameter: _macro
	Return: number
	
  Accepts a string (_macro) and checks if fooServ.foodNutdata exists. 
  If foodNutdata exists then searches foofNutdata for an element
  who's name element and returns that element's value as a number.
  */
  getMacroData(_macro: string){  
    let macro;
    if(this.foodServ.foodNutdata){
      try {
        macro = this.foodServ.foodNutdata.find((element) => {
          return element.name == _macro;
        });

        if(macro) {
          return parseFloat(macro.value) * this.NoOfServ;
        }
        else if (_macro == 'Energy'){
          console.log('no kcal value, must calculate')
          let cals = ((4 * this.getMacroData('Protein') + (4 * this.getMacroData('Carbohydrate, by difference') + (9 * this.getMacroData('Total lipid (fat)'))))) 
          this.foodServ.foodNutdata.push({ "nutrient_id": "208", "name": "Energy", "derivation": "LCCS", "group": "Proximates", "unit": "kcal", "value": cals })
          
          return cals;
        }

        else{
          return 0;
        }

      }
      catch(err) {
        console.log(err)
      }
      

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
  getAllNutrients(record, prop){
    if(prop == "value" && record.value){
      return parseFloat(record.value) * this.NoOfServ;
    }
    else{
      return record[prop];
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
  getServMeasure(){
    let servMes;
    if(this.foodServ.measures){
      try{
        let servMesArr = this.foodServ.measures[0];

        if(servMesArr.label == "OZA")
          servMesArr.label = "oz"
        
        servMes = servMesArr.qty +" "+ servMesArr.label + " (" + servMesArr.eqv+servMesArr.eunit+")";
        return servMes;
      }
      catch(e){
      }
    }
  }
  

  /*
	Function: toggleMicroNutrients()
	Parameter: none
  Return: none
  
  Inverts the value of showMicroNutrients when called.
  showMicroNutrients is delcared initially as false.
  */
  toggleMicroNutrients(){
    this.showMicroNutrients = !this.showMicroNutrients;
  }


  

  /*
	Function: toggleMicroNutrients()
	Parameter: none
  Return: none
  
  Create date variable and pass today's date yyyy/mm/dd,
  then push to foodNutdata array as object property 'date'.
  Push foodNutdata to foodIntake array, then closes the foodModal.

  */
  saveAndCloseModal(){

    this.record.date = this.userStats.todaysDate;
    this.record.meal = this.pageTitle;
    let statRecord = {};

    if(this.userStats.userDailyStats[this.userStats.todaysDate]){
      statRecord = this.userStats.userDailyStats[this.userStats.todaysDate]["nutrients"] || {};
    }
    
    this.foodServ.foodNutdata.push(this.record);


    //update serving size of selected food
    this.foodServ.foodNutdata.forEach(element => {
      let lastArrElement = this.foodServ.foodNutdata[this.foodServ.foodNutdata.length - 1]

      if(element.name == 'Energy'){
        lastArrElement.calories = ((parseFloat(element.value) * this.NoOfServ) || 0);
        lastArrElement.servings = this.NoOfServ;
        lastArrElement.uid = Math.random();
      }
      if(element.name == 'Sodium, Na'){
        let color;
        let value = (parseFloat(element.value) * this.NoOfServ);

        if((value > 500 && element.unit == "mg") || (value > 50 && element.unit =="g"))
          color = "red";
        else if ((value > 299 && element.unit == "mg") || (value > 29 && element.unit == "g"))
          color = "orange"
        else
          color = "black";

        lastArrElement.sodium = { value: value || 0, unit: (element.unit.toLowerCase()|| "mg"), color: color}
      }

         
      //calculate values by multiplying number of servings
      element.value = ((parseFloat(element.value)) || 0);
      
      //check if element already exits or if name is not food's name
     
      if (!statRecord[element.name] && element.name != this.record.name){
        statRecord[element.name] = 0;
      }
      //check if name is not food's name
      if(element.name != this.record.name){
        statRecord[element.name] += (element.value * this.NoOfServ);
      }

    });
    this.dbService.writeFoodToDB(this.record.date, this.record.meal, this.record.name, this.foodServ.foodNutdata);   
    console.log(this.record.date, statRecord, "nutrients")
    this.dbService.writeDailyStatsToDB(this.record.date, statRecord, "nutrients");   
    
    this.closeModal();
  }
  
  strCleanUp(str) {
    let STR = str.replace(/:[.#$\[\]\///\._]/g, ' ');
    return STR;
  }

  


  /*
	Function: closeModal()
	Parameter: none
  Return: none

  Closes the modal when called.
  */
  closeModal() {
    this.viewCtrl.dismiss();
  }


}
