import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import {Headers} from '@angular/http';
import {Router} from '@angular/router';
import {} from '@a'

import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {
    private loginURL:string = "http://192.168.0.5:3005/login";
    private isAuthenticated = false;
    private tokn = "auth_key";
  
    constructor(private http: Http, private router: Router) {}

    
    isloggedIn() {
      var token = window.localStorage.getItem(this.tokn);

      if (token) {
        console.log(" already logged in");
        return true;
      }
      return false;
    }

    getToken() {
      return window.localStorage.getItem(this.tokn);
    }

    //Login a user with email and password
    login(username, password) {
      var headers = new Headers();
      headers.append('Content-Type','application/json');
      //headers.append('Access-Control-Allow-Origin','*');
      //headers.append('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
      


      console.log("here:" + username + password);
      var json = JSON.stringify({username ,password});
      
      return new Promise((resolve) => {
        this.http.post(this.loginURL, json, {headers: headers})
                  .subscribe((data) => {
                      if(data.status == 200) {
                        console.log("setting auth_key");
                        window.localStorage.setItem(this.tokn, data.json().token);
                        this.isAuthenticated = true;
                       } 
                  resolve(this.isAuthenticated);
                  },
                  (err) => {
                    console.log("error:" + err);
                    if (err.status == 401) {
                      console.log("invalid user");
                    }
                    resolve(this.isAuthenticated);
                  }

        )
        
        })
    /* return this.http.post(this.loginURL,json,{headers: headers})
              .subscribe(result => this.callback(result)
              , err=> (this.onError(err))
              )*/
          //.map((res)=> this.extractData(res)
            
      //      )
      //  .subscribe(result=> this.callback(result));
    
    }

    private onError(res:Response) {
      console.log("error mila");
      return JSON.stringify(res.status);
    }

   // Logout the user
    logout() {
      // To log out, just remove the token and profile
      // from local storage
      //localStorage.removeItem('profile');
      localStorage.removeItem(this.tokn);

      // Send the user back to the public deals page after logout
      this.router.navigateByUrl('');
    }


  // handle Response from login URL
  callback (item: any) {
     if (item.status == 200) {
       console.log("in callback, token:" +  item.json().token);
       localStorage.setItem(this.tokn, item.json().token);
        this.isAuthenticated = true;
     }
     if (item.status == 401) {
       console.log(" user not foundaaa");
     }
        
     
    console.log("hi: " + item);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}

