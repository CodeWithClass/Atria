import { HttpClient } from '@angular/common/http';
// import { Http, Response} from '@angular/http'
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
// import { Observable } from 'rxjs/Observable';

@Injectable()

export class BPService {
    private client_id = '477d71a15cb74d14aec1d661cdc92e81'
    private ihealthAuthURL = encodeURI("https://api.ihealthlabs.com:8443/OpenApiV2/OAuthv2/userauthorization/?client_id=" + this.client_id + "&response_type=code&redirect_uri=http://atria.coach/api/ihealth&APIName=OpenApiBP")
    constructor(private http: HttpClient) {
    }

    public loadBPdata(){
        return this.http.get(this.ihealthAuthURL)
            .subscribe(
                data=>{
                    console.log(data)
                },
                err =>{
                    console.log(err)
                }
            )
            
    }
}