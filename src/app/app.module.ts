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
import { NativePageTransitions } from '@ionic-native/native-page-transitions';


import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { firebaseConfig } from '../config';
import { AuthService } from '../services/auth.service';
import { DBService } from '../services/db.service';
import { AngularFireDatabaseModule } from 'angularfire2/database';


// Pages
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { SettingsPage } from '../pages/settings/settings';
import { FoodPage } from '../pages/food/food';
import { AddFoodPage } from '../pages/food/addfood/addfood';
import { addmealPage } from '../pages/food/addfood/addmeal/addmeal';
import { AddFoodModal } from '../pages/food/addfood/addmeal/addfoodmodal/addfoodmodal';
import { EditfoodModal} from '../pages/food/addfood/editfoodmodal/editfoodmodal';
import { MyStatsPage } from '../pages/mystats/mystats';
//Page modules
import { FoodPageModule, } from '../pages/food/food.module';
import { AddFoodPageModule } from '../pages/food/addfood/addfood.module';
import { addmealPageModule } from '../pages/food/addfood/addmeal/addmeal.module';
import { AddfoodModalModule } from '../pages/food/addfood/addmeal/addfoodmodal/addfoodmodal.module';
import { EditfoodModalModule } from '../pages/food/addfood/editfoodmodal/editfoodmodal.module'
import { MystatsPageModule } from '../pages/mystats/mystats.module';
import { HomePageModule } from '../pages/home/home.module';
import { LoginPageModule } from '../pages/login/login.module';
import { SignupPageModule } from '../pages/signup/signup.module';
import { SettingsPageModule } from '../pages/settings/settings.module';

// Providers
import { UserStatsProvider } from '../providers/user-stats/user-stats';
import { FoodServiceProvider } from '../providers/foodservice/foodservice';
import { fromEventPattern } from '../../node_modules/rxjs';

@NgModule({
  declarations: [
    MyApp,
    // HomePage,
    // LoginPage,
    // SignupPage,
    // SettingsPage,
    // FoodPage,
    // AddFoodPage,
    // addmealPage,
    // AddFoodModal,    
    // MyStatsPage,
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

    FoodPageModule,
    AddFoodPageModule,
    EditfoodModalModule,
    addmealPageModule,
    AddfoodModalModule,
    MystatsPageModule,
    HomePageModule,
    LoginPageModule,
    SignupPageModule,
    SettingsPageModule,


    
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
    addmealPage,
    AddFoodModal,
    EditfoodModal,
    MyStatsPage,
    TabsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NativePageTransitions,
    UserStatsProvider,
    FoodServiceProvider,
    AngularFireAuth,
    AuthService,
    DBService,
  ]
})
export class AppModule {


}
