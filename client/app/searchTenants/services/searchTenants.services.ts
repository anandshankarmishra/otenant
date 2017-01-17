import { Injectable }     from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions} from '@angular/http';
import {Headers} from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import{Tenant } from '../../models/tenant';

@Injectable()
export class SearchTenantsService {

  private searchURL:string = "http://localhost:3005/searchTenants";
  
  private tenants: Observable<Tenant[]>;
//  tenant: Tenant;

  constructor(private http: Http) {}

  searchTenants(desired_city, desired_areas, types_of_tenant): Observable <Tenant[]>{
   // console.log ("got param:" + desired_city + ", " + desired_areas + ", "  + types_of_tenant)
    var headers = new Headers();
    headers.append('Content-Type','application/json');

    var json = JSON.stringify({desired_city ,desired_areas, types_of_tenant});
    
    /*this.http.post(this.searchURL,json,{headers: headers})
        .map(res=> res.json().error)
        .subscribe(result=> this.callback(result));*/
   let params: URLSearchParams = new URLSearchParams();
    params.set("desired_city", desired_city);
    params.set("desired_areas", desired_areas);
    params.set("types_of_tenant", types_of_tenant);
  
  let options = new RequestOptions(
    { headers: headers,
     search: params }
    );

   return this.http.get(this.searchURL, options)
    .map(res=> res.json())
    //.subscribe(result=> this.callback(result));

    //return this.tenants;
      
    
   
  }

  // handle Response from login URL
  callback (item: any){
  //console.log("hi: " + JSON.stringify(item));
   //console.log("hikk: " + item[0]['_id']);
    
    for (let i in item) {
     // this.tenants[i].id = (JSON.stringify(item[i]['_id']));
    /*console.log ("User id:" + JSON.stringify(item[i]['_id']));
    console.log ("User tenant type:" + JSON.stringify(item[i]['userTypeOfTenant']));
    console.log ("User Desired city:" + JSON.stringify(item[i]['userDesiredCity']));*/
    ///console.log ("User name: " + JSON.stringify(item[i]['userFullName']))

      let id:string = item[i]['_id'];
      console.log ("id: " + id); 
      let name:string = item[i]['userFullName'];
      console.log ("name: " + name); 

      //this.tenants[i] = new Tenant (id,name);
    }
    //return this.tenants;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}