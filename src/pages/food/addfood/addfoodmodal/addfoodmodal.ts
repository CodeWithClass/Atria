import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FoodServiceProvider } from '../../../../providers/foodservice/foodservice';
import { UserStatsProvider } from '../../../../providers/user-stats/user-stats';

/**
 * Generated class for the AddfoodmodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */ 

@IonicPage()
@Component({
  selector: 'page-addfoodmodal',
  templateUrl: 'addfoodmodal.html',
})
export class AddFoodModal {
  ndbno;
  name = this.navParams.get('Name');
  manu = this.navParams.get('Manu');
  NoOfServ: number = 1;
  showMicroNutrients = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    public foodServ: FoodServiceProvider,
    public userStats: UserStatsProvider
  
  ) {
    
    
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
        let macroArr = this.foodServ.foodNutdata;
        macro = macroArr.find((element) => {
          return element.name == _macro;
        });
      }
      catch(err) {
        console.log(err)
      }
      if(macro){
        return parseInt(macro.value) * this.NoOfServ;
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
    if(prop == "value"){
      return parseInt(record.value) * this.NoOfServ;
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
    let fullDate = new Date();        
    let today = fullDate.getFullYear() + "-" + (fullDate.getMonth()+1) + "-" + fullDate.getDate();
    this.foodServ.foodNutdata.date = today;

    this.userStats.foodIntake.push(this.foodServ.foodNutdata);

    this.closeModal();
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
