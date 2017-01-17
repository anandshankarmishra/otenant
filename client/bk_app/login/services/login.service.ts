import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import {Headers} from '@angular/http';

//import { Observable } from 'rxjs';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {
private Myurl:string = "http://localhost:3005/signup";
  constructor(private http: Http) {}

  login(username, passowrd) {
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    var json = JSON.stringify({fullname: 'mohit' ,email: 'anand', passowrd: 'lamba', desired_city: 'boka', desired_area:["abc", "def"], type_of_tenant:'couple'});
    this.http.post(this.Myurl,json,{headers: headers}).map(res=> res.json).toPromise().catch(this.handleError);
   
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}

