import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { RoundProgressModule } from 'angular-svg-round-progressbar'; 
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { firebaseConfig } from '../config';
import { AuthService } from '../services/auth.service';
import { DBService } from '../services/db.service';
import { AngularFireDatabaseModule } from 'angularfire2/database';



import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { SettingsPage } from '../pages/settings/settings';

import { FoodPage } from '../pages/food/food';
import { AddFoodPage } from '../pages/food/addfood/addfood';
import { AddBreakfastPage } from '../pages/food/addfood/addbreakfast/addbreakfast';
import { AddFoodModal } from '../pages/food/addfood/addfoodmodal/addfoodmodal';


import { MyStatsPage } from '../pages/mystats/mystats';

import { UserStatsProvider } from '../providers/user-stats/user-stats';
import { FoodServiceProvider } from '../providers/foodservice/foodservice';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    SettingsPage,
    FoodPage,
    AddFoodPage,
    AddBreakfastPage,
    AddFoodModal,    
    MyStatsPage,
    TabsPage,
  ],
  imports: [
    BrowserModule,
    RoundProgressModule, 
    ChartsModule,    
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig.fire),
    AngularFireDatabaseModule,
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    SettingsPage,
    FoodPage,
    AddFoodPage,
    AddBreakfastPage,
    AddFoodModal,
    MyStatsPage,
    TabsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserStatsProvider,
    FoodServiceProvider,
    AngularFireAuth,
    AuthService,
    DBService,
  ]
})
export class AppModule {


}
