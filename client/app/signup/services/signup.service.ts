import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import {Headers} from '@angular/http';

import { Observable } from 'rxjs';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import {AppRoutes} from '../../app-routes';

@Injectable()
export class SignUpService {

  //private signUpURL:string = "http://localhost:3005/signup";
  
  constructor(private http: Http ) {}

  
/*signUp(fullname, email, password, desired_city, desired_area: String[], type_of_tenant) {
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    
    //below will print {"fullname":"ttt","email":"yyy","passowrd":"aaaa","desired_city":"aaaa","desired_area":["abc","def"],"type_of_tenant":"ggg"}
    var json = JSON.stringify({fullname ,email, password, desired_city, desired_area:["abc", "def"], type_of_tenant});
    
    console.log(json);
    
    //var json = JSON.stringify({fullname: 'mohit' ,email: 'anand', passowrd: 'lamba', desired_city: 'boka', desired_area:["abc", "def"], type_of_tenant:'couple'});
    this.http.post(this.signUpURL,json,{headers: headers}).map(res=> res.json).
      toPromise().catch(this.handleError);
    
     
}*/

signUp(fullname, email, password, desired_city, desired_area: String[], type_of_tenant): Observable<boolean>//: Promise<any> 
{
    var headers = new Headers();
    headers.append('Content-Type','application/json');
    
    var success: boolean = false;

    var json = JSON.stringify
      ({
        fullname ,
        email, 
        password, 
        desired_city, 
        desired_area, 
        type_of_tenant
      });
    
    console.log(json);
    
    var self = this;
    
  return this.http.post(AppRoutes.signUpURL,json,{headers: headers})
     .map((res:Response) =>  res.json().error);
    
     //.subscribe(result=> this.callback(result))
     ;
}

//Process http resonse returned from server on signUp
    callback(item: any) {
      console.log("hellno: " + item);//JSON.stringify(item));
    }1
  

//Handle Observable Erro
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

/*private handleError (error: Response | any) {
  // In a real world app, we might use a remote logging infrastructure
  let errMsg: string;
  if (error instanceof Response) {
    const body = error.json() || '';
    const err = body.error || JSON.stringify(body);
    errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  } else {
    errMsg = error.message ? error.message : error.toString();
  }
  console.error(errMsg);
  return Promise.reject(errMsg);
}*/
}
