import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import {Headers} from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {
    private loginURL:string = "http://localhost:3005/login";
    private isLoggedIn = false;
  
    constructor(private http: Http) {}

    login(email, password) {
      var headers = new Headers();
      headers.append('Content-Type','application/json');

      var json = JSON.stringify({email ,password});
      
     return this.http.post(this.loginURL,json,{headers: headers})
          .map(res=> res.json().error)
      //  .subscribe(result=> this.callback(result));
    
  }

  // handle Response from login URL
  callback (item: any) {
      if(item == "yes") {
        localStorage.setItem('auth_key', item.json().token);
        this.isLoggedIn = true;
      }
    console.log("hi: " + item);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}

