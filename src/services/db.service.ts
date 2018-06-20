import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database"; 

@Injectable()

export class DBService{
    public arrData;
 
    constructor(
    private fdb: AngularFireDatabase
    ){
        this.getDataFromDB();
    }

    getDataFromDB(){
        console.log('getdatafromdb called');
        this.fdb.list('heros/').valueChanges().subscribe(
            data =>{
            console.log(data);
            this.arrData = data;
            }
        )
    }

   

   
}