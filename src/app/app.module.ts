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
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { Keyboard } from '@ionic-native/keyboard';



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
import { BloodPressurePage } from '../pages/bloodpressure/bloodpressure';
import { ManualbpPage} from '../pages/bloodpressure/manualbp/manualbp';
import { addmealPage } from '../pages/food/addmeal/addmeal';
import { AddFoodModal } from '../pages/food/addfoodmodal/addfoodmodal';
import { EditfoodModal} from '../pages/food/editfoodmodal/editfoodmodal';
import { MyStatsPage } from '../pages/mystats/mystats';
import { SleepPage } from '../pages/sleep/sleep';

//Page modules
import { AddFoodPageModule } from '../pages/food/addfood/addfood.module';
import { addmealPageModule } from '../pages/food/addmeal/addmeal.module';
import { AddfoodModalModule } from '../pages/food/addfoodmodal/addfoodmodal.module';
import { BloodPressurePageModule } from '../pages/bloodpressure/bloodpressure.module';
import { ManualbpPageModule } from '../pages/bloodpressure/manualbp/manualbp.module';
import { EditfoodModalModule } from '../pages/food/editfoodmodal/editfoodmodal.module';
import { FoodPageModule, } from '../pages/food/food.module';
import { MystatsPageModule } from '../pages/mystats/mystats.module';
import { HomePageModule } from '../pages/home/home.module';
import { LoginPageModule } from '../pages/login/login.module';
import { SignupPageModule } from '../pages/signup/signup.module';
import { SettingsPageModule } from '../pages/settings/settings.module';
import { SleepPageModule } from '../pages/sleep/sleep.module';


// Services
import { UserStatsProvider } from '../services/user.stats';
import { FoodServiceProvider } from '../services/food.service';
import { fromEventPattern } from '../../node_modules/rxjs';
import { BPService } from '../services/bp.service';

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
    BloodPressurePageModule,
    ManualbpPageModule,
    EditfoodModalModule,
    addmealPageModule,
    AddfoodModalModule,
    MystatsPageModule,
    HomePageModule,
    LoginPageModule,
    SignupPageModule,
    SettingsPageModule,
    SleepPageModule,


    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    SettingsPage,
    BloodPressurePage,
    ManualbpPage,
    FoodPage,
    AddFoodPage,
    addmealPage,
    AddFoodModal,
    EditfoodModal,
    MyStatsPage,
    TabsPage,
    SleepPage,
  ],
  providers: [
    InAppBrowser,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NativePageTransitions,
    UserStatsProvider,
    FoodServiceProvider,
    AngularFireAuth,
    AuthService,
    DBService,
    Keyboard,
    BPService,
  ]
})
export class AppModule {


}
