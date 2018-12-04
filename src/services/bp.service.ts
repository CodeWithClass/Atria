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
    private client_id: string = '477d71a15cb74d14aec1d661cdc92e81'
    private client_secret: string = 'f4a0b5d7986843529cc0f4c3f614c3d5'
    private AccessCode: string;
    private redirect_uri: string = "http://atria.coach/api/ihealth/auth_inprogress"
    private iHealthAuthURL: string = "https://api.ihealthlabs.com:8443/OpenApiV2/OAuthv2/userauthorization/?"
    private AuthObj: object;
    private sc: string = "D8F9561AAF624FE6B4DA9E0630E4EC01"
    private sv: string = "A106AD714CC84B559CD16A64581CD233"
    // bpMetrics = this.userStats.bpMetrics; 

    constructor(private http: HttpClient,
                public inAppBrowser: InAppBrowser,
                public userStats: UserStatsProvider,
                public dbService: DBService,
                public authService: AuthService,
        ) {
        this.AuthObj = this.userStats.iHealthAuth
    }
  
    public iHealthAuth(){
        let params = new URLSearchParams();
        params.set("client_id", this.client_id)
        params.set("response_type", "code")
        params.set("APIName", "OpenApiBP")
        params.set("redirect_uri", this.redirect_uri + '?uid=' + this.authService.getUID())
        // params.set("uid", this.authService.getUID())

        console.log(this.iHealthAuthURL + params.toString())
        const browser = this.inAppBrowser.create(encodeURI(this.iHealthAuthURL+params.toString()), "_self");
        
        try {
            // browser.on('loadstop').subscribe(event => {
            //     // let url = event.url; 
            //     // this.AccessCode = url.split('code=')[1]
            // });

            browser.on('exit').subscribe(event => {
                this.fetchBPdata();
            });
            
        }
        catch (e) {
            console.log(e)
        }
    }

    public getAccessToken(){
        if(!this.AccessCode)
            return
        
        let params = new URLSearchParams();
            params.set("client_id", this.client_id)
            params.set("client_secret", this.client_secret)
            params.set("grant_type", "authorization_code")
            params.set("redirect_uri", this.redirect_uri)
            params.set("code", this.AccessCode)

        this.http.get(this.iHealthAuthURL + params.toString())
            .subscribe(
                Response => {
                    this.AuthObj = Response;
                    console.log(this.AuthObj)
                    this.userStats.iHealthAuth = this.AuthObj
                    this.dbService.storeiHealthAuth(this.AuthObj)
                },
                err => {
                    console.log(err);
                }
            );
    }

    public fetchBPdata(){
        this.AuthObj = this.userStats.iHealthAuth

        if (!this.userStats.iHealthAuth)
            return console.log('authobj empty');

        let url = "https://api.ihealthlabs.com:8443/openapiv2/user/" + this.AuthObj["UserID"] + "/bp.json/?"
        let params = new URLSearchParams();
            params.set("client_id", this.client_id)
            params.set("client_secret", this.client_secret)
            params.set("redirect_uri", this.redirect_uri)
            params.set("access_token", this.AuthObj["AccessToken"])
            params.set("sc", this.sc)
            params.set("sv", this.sv)
        // console.log(url + params.toString())
        this.http.get(url + params.toString())
            .subscribe(
                data => {
                    // console.log('new BP data'+JSON.stringify(data))
                    this.userStats.bpMetrics = data["BPDataList"]
                    this.dbService.writeDailyStatsToDB(this.userStats.todaysDate, this.userStats.bpMetrics, 'bp')
                },
                err => {
                    console.log(err);
                }
            );
    
    }
}