import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database"; 
import { AuthService } from "./auth.service";
import { UserStatsProvider } from '../providers/user-stats/user-stats';

@Injectable()

export class DBService{
    public arrData;

    constructor(
    private fdb: AngularFireDatabase,
    public authService: AuthService,
    public userStats: UserStatsProvider,
    ){
    }

    loadDBdata(){
        this.fdb.list('users/'+this.authService.getUID()).valueChanges().subscribe(
            data => {
                this.userStats.userStatsConatiner = data[0];
                this.userStats.foodIntake = data[2] || {};
                this.userStats.userNutStats = data[1] || {};
                console.log(data)
                // this.setIfStats(data[0]['goalCalories']);
                // console.log(data[0]['goalCalories'])
                
                    
            }
        )
    }

    public setIfStats(userProfileStats) { 
        if(userProfileStats)
            this.userStats.userStatsConatiner['nodata'] = false;
        else{
            this.userStats.userStatsConatiner['nodata'] = true;
        }
    }

    writeFoodToDB(date, meal, foodname, data){
        this.fdb.list('users/'+this.authService.getUID()+'/3meals/'+date+'/'+meal).set(this.strCleanUp(foodname), data);
    }

    removeFromDB(date, meal, foodname){
        console.log("removal of "+foodname)
        this.fdb.list('users/' + this.authService.getUID() + '/3meals/' + date + '/' + meal).remove(this.strCleanUp(foodname));

    }

    writeDailyStatsToDB(date, data){
        this.fdb.list('users/' + this.authService.getUID() + '/2dailyStats').set(date, data);
    }

    writeStatsToDB(data){
        this.fdb.list('users/' + this.authService.getUID()).set('1stats', data);
    }

    strCleanUp(str) {
        let STR = str.replace(/:[..#$\[\]\///\._]/g, ' ');
        return STR;
    }

   

   
}