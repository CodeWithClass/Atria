import { HttpClient } from '@angular/common/http';
// import { Http, Response} from '@angular/http'
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
// import { Observable } from 'rxjs/Observable';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { URLSearchParams } from '@angular/http'
import { UserStatsProvider } from './user.stats'
import { DBService } from './db.service'
import { AuthService } from './auth.service'
@Injectable()

export class BPService {
    private client_id: string = '5d81605593c6c4e8e1c3871f69fa3ed026659338266b7e27ba07a352bfb6d7fb'
    private client_secret: string = '2798f13818cc213ccce23a4c7c6e0e107a2156ff9aeffb275bc8e9eccde4dd63'
    private AccessCode: string;
    private redirect_uri: string = "http://atria.coach/api/withings/auth"
    private withingsAuthURL: string = "https://account.withings.com/oauth2_user/authorize2?"
    private withingsDataUrl: string = "http://atria.coach/api/withings/fetchdata?"

    private AuthObj: object;


    constructor(private http: HttpClient,
                public inAppBrowser: InAppBrowser,
                public userStats: UserStatsProvider,
                public dbService: DBService,
                public authService: AuthService,
        ) {
        this.AuthObj = this.userStats.withingsAuth
    }
  
    public withingsAuth(){
        let params = new URLSearchParams();
        params.set("client_id", this.client_id)
        params.set("response_type", "code")
        params.set("scope", "user.metrics")
        params.set("redirect_uri", this.redirect_uri)
        params.set("state", this.authService.getUID())

        console.log(this.withingsAuthURL + params.toString())
        const browser = this.inAppBrowser.create(encodeURI(this.withingsAuthURL+params.toString()), "_self");
        try {
            // browser.on('loadstop').subscribe(event => {
            //     let url = event.url; 
            //     this.AccessCode = url.split('code=')[1]
            // });
            browser.on('exit').subscribe(event => {
               console.log('alldoner')
            });

            
        }
        catch (e) {
            console.log(e)
        }
 
    }

    public fetchBPdata(){
        if (!this.userStats.withingsAuth)
            return

        let params = new URLSearchParams();
        params.set("access_token", this.userStats.withingsAuth['access_token'])
        params.set("action", "getmeas")
        params.set("Uid", this.authService.getUID())
        params.set("date", this.userStats.todaysDate)

        let url = this.withingsDataUrl + params.toString()
        console.log(url)
        this.http.get(url)
            .subscribe(
                res => {
                    console.log(res)
                },
                err => {
                    console.log(err);
                }
            );
    }
   
}