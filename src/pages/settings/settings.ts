import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from "angularfire2/database"; 



/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    public app: App,
    public auth: AuthService,
    private fdb: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    ) {
  }

  logout(){
    
  this.afAuth.auth.signOut().then(() => {
      
      // this.fdb.database.goOffline();
      this.navCtrl.setRoot(LoginPage);

    });
  }
}
