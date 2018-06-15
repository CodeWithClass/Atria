import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { TabsPage } from '../tabs/tabs';
//import { MongoosedbProvider } from '../../providers/mongoosedb/mongoosedb'

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController, /*public MongoDB: MongoosedbProvider*/) {
    
  }



  login(){
    this.navCtrl.push(TabsPage);
  }

  signup(){
    this.navCtrl.push(SignupPage);
  
  }
}
