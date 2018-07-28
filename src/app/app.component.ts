import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../services/auth.service';


// import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
//  import {addmealPage} from '../pages/food/addfood/addmeal/addmeal';
//import { AddFoodModal } from '../pages/food/addfood/addfoodmodal/addfoodmodal';
//just uncomment and change root property below

import { timer } from 'rxjs/observable/timer'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage;
  public showSplash: boolean = true;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private auth: AuthService
  ){
  
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.splashScreen.hide();
      this.showSplash = false;
    });

    this.auth.afAuth.authState
      .subscribe(
        user => {
          if (user) {
            this.rootPage = HomePage;
          }
        },
        () => {
          this.rootPage = LoginPage;
        }
      );
  
  }



  
} 
