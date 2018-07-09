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
                this.userStats.foodIntake = data[0];
                this.userStats.bpData = data[1]
            }
        )
    }


    writeFoodToDB(date, meal, foodname, data){
        this.fdb.list('users/'+this.authService.getUID()+'/meals/'+date+'/'+meal).set(this.strCleanUp(foodname), data);
    }

    removeFromDB(date, meal, foodname){
        console.log("removal of "+foodname)
        this.fdb.list('users/' + this.authService.getUID() + '/meals/' + date + '/' + meal).remove(this.strCleanUp(foodname));

    }

    strCleanUp(str) {
        let STR = str.replace(/[.#$\[\]\/_]/g, ' ');
        return STR;
    }

   

   
}