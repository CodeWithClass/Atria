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

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { firebaseConfig } from '../config';
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
import { WelcomePage } from '../pages/welcome/welcome';
import { ActivityPage }  from '../pages/activity/activity';

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
import { WelcomePageModule } from '../pages/welcome/welcome.module';
import { ActivityPageModule } from '../pages/activity/activity.module'

// Services
import { AuthService } from '../services/auth.service';
import { DBService } from '../services/db.service';
import { UserStatsProvider } from '../services/user.stats';
import { FoodServiceProvider } from '../services/food.service';
import { BPService } from '../services/bp.service';
import { FitbitService } from '../services/fitbit.service';


@NgModule({
  declarations: [
    MyApp,
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
    WelcomePageModule,
    ActivityPageModule,
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
    WelcomePage,
    ActivityPage,
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
    FitbitService,
  ]
})
export class AppModule {}
