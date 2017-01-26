import { Injectable }     from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import {Headers} from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import {Tenant} from '../../models/tenant';
import {AppRoutes} from '../../app-routes';

@Injectable()
export class TenantService {
     tenant:Tenant;

    //get tenant profile
    //private profileURL = "http://localhost:3005/getUserProfile";
   // profileURL = AppRoutes.getUserProfileURL;
    //private notifURL = "http://localhost:3005/getNotifications";
    //private approvURL = "http://localhost:3005/approveNotification";

    constructor(private http: Http) {}

    getTenantProfile(token): Observable<Tenant> {
      if(token) {
            let params: URLSearchParams = new URLSearchParams();
            params.set("token", token);
            return this.http.get(AppRoutes.getUserProfileURL, 
                {
                    search: params
                })
                .map((res)=> res.json())
                //.subscribe((prof)=> this.callback(prof)); 
        }
    
    }

    getNotifications(token): Observable<String[]> {
      if(token) {
            let params: URLSearchParams = new URLSearchParams();
            params.set("token", token);
            //return this.http.get(this.notifURL, 
            return this.http.get(AppRoutes.getNotificationsURL, 
                {
                    search: params
                })
                .map((res)=> res.json())
        }
    
    }

    updateTenantProfile(token:string) {
      if(token) {
        
      }
    }

    //takes user token and notification id to approve a particular notification
    approveNotification(token:string, notification:string) {
      console.log(" notf id:" + notification);

      var headers = new Headers();
      headers.append('Content-Type','application/json');

       var json = JSON.stringify({token,notification});

      let params: URLSearchParams = new URLSearchParams();
            params.set("token", token);
            params.set("_id:", notification);
            return this.http.put(AppRoutes.approveNotification, json,{headers: headers})
                .map((res)=> res.json());
    }

    updateName(token:string, userFullName:string) {
        console.log("updating name:" + name);
        var headers = new Headers();
        headers.append('Content-Type','application/json');

        var json = JSON.stringify({token,userFullName});

        let params: URLSearchParams = new URLSearchParams();
            params.set("token", token);
            params.set("userFullName", userFullName);
            return this.http.put(AppRoutes.updateUserFullNameURL, json,{headers: headers})
                .map((res)=> res.json());
    }

    changePassword(token:string, password:string) {
        console.log(" new password: " + password);

        var headers = new Headers();
        headers.append('Content-Type','application/json');

        var json = JSON.stringify({token,password});

        let params: URLSearchParams = new URLSearchParams();
            params.set("token", token);
            params.set("password", password);
            return this.http.put(AppRoutes.changePassword, json,{headers: headers})
                .map((res)=> res.json());


    }
    deleteAccount(token, password) {
        var headers = new Headers();
        headers.append('Content-Type','application/json');

        var json = JSON.stringify({token, password});

        let params: URLSearchParams = new URLSearchParams();
            params.set("token", token);
            params.set("password", password);
            return this.http.put(AppRoutes.deleteAccountURL, json,{headers: headers})
                .map((res)=> res.json());
    }
}

