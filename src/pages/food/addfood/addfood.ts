import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { addmealPage } from './addmeal/addmeal';
import { FoodServiceProvider } from '../../../providers/foodservice/foodservice';
import { UserStatsProvider } from '../../../providers/user-stats/user-stats';
import { DBService } from '../../../services/db.service';

/**
 * Generated class for the AddfoodPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addfood',
  templateUrl: 'addfood.html',
})
export class AddFoodPage {
  

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public foodServ: FoodServiceProvider,
              public userStats: UserStatsProvider,
              public dbService: DBService
            ) {
  }

  launchAddFoodSubPage(_pageTitle){
    this.navCtrl.push(addmealPage, { PageTitle: _pageTitle }, { animate: true, direction: 'forward'});
  }

  displayMeals(meal: string){
    try{
      let allMealEntries = this.userStats.foodIntake;
      
      let mealEntries = [];
      allMealEntries = Object.values(allMealEntries[this.userStats.todaysDate][meal])

      //if there logged meals [not empty]
      if(allMealEntries.length > 0){
        
        //take each of the meal entries  
        allMealEntries.forEach((element)=>{
          // let _element;
          // //dig deep for array nested in objects
          // while ((element).constructor === Object){
          //   _element = Object.values(element)
          //   element = _element[0]       
          // }

          if (element instanceof Array){
            //check last array of each for matching meal
            let mealEntry = element[element.length - 1];

            if (mealEntry.meal == meal) {
              //if match, push to array to be returned
              mealEntries.push(mealEntry);
              // console.log(mealEntries)
            }
          }
          
        })
        
      return mealEntries;
      }
    }
    catch(e){
    }
  }

  delRecord(record, meal){
    //get all food loaded food data
    let allMealEntries = this.userStats.foodIntake;
    //filter foods logged today, and convert obj to array
    allMealEntries = Object.values(allMealEntries[this.userStats.todaysDate][meal])
    let metaData;
    let counter = 0;
    let _element

    allMealEntries.forEach(element => {
      
      //convert obj to arr
      element=Object.values(element)
 
      //get entire record then get the last element of said record
      metaData = element[element.length-1]
  
      //if the both the uid of the record and element matches (date is just extra checking)
      if ((metaData.uid == record['uid']) && (metaData.date == this.userStats.todaysDate)){
        this.dbService.removeFromDB(metaData.date, metaData.meal, metaData.name);  
      }
      else
        counter++;
    });
    
  }
}
