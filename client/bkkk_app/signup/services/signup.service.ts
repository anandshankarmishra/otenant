import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import {Headers} from '@angular/http';

//import { Observable } from 'rxjs';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class SignUpService {
private Myurl:string = "http://localhost:3005/signup";
  constructor(private http: Http) {}

  //signUp(): Observable<Boolean> {
    //  console.log("reached signup service");
    //this.http.get(`http://localhost:3005/signup`);
    //console.log("exiting signup service");
    //return;
  //}

/**
  signUp(): Promise<{}> {
    return this.http.get(this.Myurl)
               .toPromise()
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);                         
  }
*/

signUp(fullname, email, passowrd, desired_city, desired_area: String[], type_of_tenant) {
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    
    //below will print {"fullname":"ttt","email":"yyy","passowrd":"aaaa","desired_city":"aaaa","desired_area":["abc","def"],"type_of_tenant":"ggg"}
    var json = JSON.stringify({fullname ,email, passowrd, desired_city, desired_area:["abc", "def"], type_of_tenant});
    console.log(json);
    
    
    //var json = JSON.stringify({fullname: 'mohit' ,email: 'anand', passowrd: 'lamba', desired_city: 'boka', desired_area:["abc", "def"], type_of_tenant:'couple'});
    this.http.post(this.Myurl,json,{headers: headers}).map(res=> res.json).toPromise().catch(this.handleError);
   
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}

