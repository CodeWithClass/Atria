import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database"; 
import { AuthService } from "./auth.service";
import { UserStatsProvider } from './user.stats';

@Injectable()

export class DBService{
    public arrData;
    public fireDBload = false;
    constructor(
    private fdb: AngularFireDatabase,
    public authService: AuthService,
    public userStats: UserStatsProvider,
    ){
    }

    loadDBdata(cb){
        this.fdb.object('users/' + this.authService.getUID()).valueChanges().subscribe(
            data => {
                try {
                    this.userStats.userStatsConatiner = data['stats'];
                    this.userStats.foodIntake = data['meals'] || {};
                    this.userStats.userDailyStats = data['dailyStats'] || {};
                    this.userStats.bpMetrics = data['dailyStats'][this.userStats.todaysDate]['bp'] || this.userStats.bpMetrics;
                    this.userStats.withingsAuth = data['withingsAuth'] || {};
                    cb();                           
                }
                catch (e) {

                }
                // console.log(data)
                // this.setIfStats(data[0]['goalCalories']);
                // console.log(this.userStats.bpMetrics)


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
        this.fdb.list('users/'+this.authService.getUID()+'/meals/'+date+'/'+meal).set(this.strCleanUp(foodname), data);
    }

    removeFromDB(date, meal, foodname){
        console.log("removal of "+foodname)
        this.fdb.list('users/' + this.authService.getUID() + '/meals/' + date + '/' + meal).remove(this.strCleanUp(foodname));

    }

    writeDailyStatsToDB(date, data, cat){
        this.fdb.list('users/' + this.authService.getUID() + '/dailyStats/' + date).set(cat, data);
    }

    writeStatsToDB(data){
        this.fdb.list('users/' + this.authService.getUID()).set('stats', data);
    }

    storewithingsAuth(data){
        this.fdb.list('users/' + this.authService.getUID()).set('withingsAuth', data);
    }




    strCleanUp(str) {
        let STR = str.replace(/:[..#$\[\]\///\._]/g, ' ');
        return STR;
    }

   

   
}