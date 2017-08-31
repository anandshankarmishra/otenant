import { Injectable }     from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
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
       console.log("getting tenant profile");
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

    updateTenantFullName(token:string, name:string)
    {
        if(token) {
            var headers = new Headers();
            headers.append('Content-Type','application/json');
            let userFullName = name;
            console.log("updating:" + userFullName);
            var json = JSON.stringify({token, userFullName});
            return this.http.put(AppRoutes.updateUserFullNameURL, json,{headers: headers})
                .map((res)=> res.json());
        }
    }

    updateTenantProfile(token:string, tenant:Tenant) {
      if(token) {
        var headers = new Headers();
        headers.append('Content-Type','application/json');
        let userDesiredArea = tenant.userDesiredArea;
        let userDesiredCity = tenant.userDesiredCity;
        let userPhoneNo  = tenant.userPhoneNo;
        let userRequirementDescription= tenant.userRequirementDescription;
        let userCurrentArea = tenant.userCurrentArea;

        console.log("updating:" + userDesiredArea + userDesiredCity + 
                                userPhoneNo + userRequirementDescription + userCurrentArea);
        var json = JSON.stringify({token, userDesiredArea, userDesiredCity,
                                    userPhoneNo, userRequirementDescription, userCurrentArea});

            return this.http.put(AppRoutes.updateUserProfileURL, json,{headers: headers})
                .map((res)=> res.json());
      }
    }

    //takes user token and notification id to approve a particular notification
    approveNotification(token:string, notification:string) {
      console.log(" notf id:" + notification);

      var headers = new Headers();
      headers.append('Content-Type','application/json');

        var json = JSON.stringify({token,notification});
        
        return this.http.put(AppRoutes.approveNotification, json,{headers: headers})
                .map((res)=> res.json());
    }

    changePassword(token:string, cur_password:string, new_password:string) {
        console.log(" current password: " + cur_password);
        console.log(" new password: " + new_password);

        var headers = new Headers();
        headers.append('Content-Type','application/json');

        var json = JSON.stringify({token,cur_password, new_password});

        /*let params: URLSearchParams = new URLSearchParams();
            params.set("token", token);
            params.set("password", cur_password);*/
            return this.http.put(AppRoutes.changePassword, json,{headers: headers})
                .map((res)=> res.json());


    }

    uploadImage(token, photo) {
        console.log("photo:" + photo.name)
        console.log("token:" + token)
        

         var headers = new Headers();
         headers.append("Authorization", token);
        //headers.append('Content-Type','multipart/form-data');

         let options = new RequestOptions({ headers: headers });
         
         let formData:FormData = new FormData();
         formData.append('token', token); //use same keys on server side to extract values
         formData.append('photo', photo);
         
         
        //var json = JSON.stringify({token, photo});

       /* let params: URLSearchParams = new URLSearchParams();
            params.set("token", token);
            params.set("password", photo);
            return this.http.put(AppRoutes.deleteAccountURL, json,{headers: headers})
                .map((res)=> res.json());*/
            
            return this.http.post(AppRoutes.uploadImageURL,formData, options)
                    .map((res:Response) =>  res.json().error);

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

