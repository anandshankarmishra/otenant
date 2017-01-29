import { Injectable }     from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions} from '@angular/http';
import {Headers} from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import{Tenant } from '../../../models/tenant';
import {AppRoutes } from '../../../app-routes';

@Injectable()
export class SearchFormService {

    private tenants: Observable<Tenant[]>;
    constructor(private http: Http) {}

  searchTenants(desired_city, desired_areas, types_of_tenant, indx, limt): Observable <Tenant[]>{
    var headers = new Headers();
    headers.append('Content-Type','application/json');

    var json = JSON.stringify({desired_city ,desired_areas, types_of_tenant});
    
   let params: URLSearchParams = new URLSearchParams();
    params.set("desired_city", desired_city);
    params.set("desired_areas", desired_areas);
    params.set("types_of_tenant", types_of_tenant);
    params.set("index", indx);
    params.set("limit", limt);
  
  let options = new RequestOptions(
    { headers: headers,
     search: params }
    );

   return this.http.get(AppRoutes.searchTenantsURL, options)
    .map(res=> res.json())

  }
}