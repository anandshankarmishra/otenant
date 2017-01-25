import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import {Headers} from '@angular/http';


import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import {AppRoutes } from '../../app-routes';

@Injectable()
export class InviteTenantService {
    //private inviteURL:string = "http://localhost:3005/inviteTenant";
    constructor(private http: Http) {}

    inviteTenant (tenantEmail:string, landlordFullName: string, 
                  landlordEmail:string, landlordPhoneNo: number, 
                  landlordMessage: string[])  {
      
      console.log(landlordFullName + " (" + landlordEmail + "," + landlordPhoneNo + ")" 
                    + " is inviting " + tenantEmail);
      var headers = new Headers();
      headers.append('Content-Type','application/json');

      var json = JSON.stringify({tenantEmail,landlordFullName,landlordEmail ,
                      landlordPhoneNo, landlordMessage});
      
      
      return this.http.put(AppRoutes.inviteTenantURL,json,{headers: headers})
          .map(res=> res.json().error)
          //.subscribe(result=> this.callback(result));

    }

    // handle Response from login URL
    callback (item: any) {
      console.log("hi: " + item);
    }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}

