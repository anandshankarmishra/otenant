import { Component, OnInit, Input,Output, NgModule, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import {SearchTenantsService} from '../services/searchTenants.services';
import{Tenant } from '../../models/tenant';

@Component({
 selector:'searchTenants-view',
 moduleId:module.id,
 templateUrl:'../searchTenants.html',
 styleUrls:['../searchTenants.css']   
})

export class SearchTenantsComponent {
       
    showDialog = false;
    tenant_email:string ='';

    tenants: Tenant[] = [];
    
    searchForm: any; 
    searchTenantsURL: string = './searchTenants';

    constructor (private searchTenantservice: SearchTenantsService,
                 private route: ActivatedRoute,
                 private formBuilder: FormBuilder,
                 private router: Router            
         ) {
           
           
        //Duplicat code from homepage Component, need to refactor later
        this.searchForm = this.formBuilder.group({
          'searchCity': ['', Validators.required],
          'searchArea': ['', Validators.required],
          'search_type_of_tenant' : ['', Validators.required]
        });
    }

    ngOnInit() {

      let desired_city = this.route.snapshot.queryParams["city"];
      console.log(" city: " + desired_city);
      let desired_area = this.route.snapshot.queryParams["area"];
      console.log(" city: " + desired_area);
      let type_of_tenant = this.route.snapshot.queryParams["tenantType"];
      console.log(" city: " + type_of_tenant);

    
      this.getTenants(desired_city, desired_area, type_of_tenant);
    }// end of ngOnInit

  
  getTenants(desired_city, desired_area, type_of_tenant): void {
    this.searchTenantservice.searchTenants(desired_city, desired_area, type_of_tenant)
  .subscribe(result=> this.tenants =(result));
  }

  
  
  //duplicate code from homepage component, refactor later
   searchTenants(): void {  
     
      if (this.searchForm.dirty && this.searchForm.valid) {
          this.router.navigate([this.searchTenantsURL], 
          {queryParams:{city: this.searchForm.value.searchCity,
                        area: this.searchForm.value.searchArea,
                      tenantType: this.searchForm.value. search_type_of_tenant} }
          );


            this.getTenants(this.searchForm.value.searchCity,
                      this.searchForm.value.searchArea,
                      this.searchForm.value. search_type_of_tenant);
  
    }
    }

    onClick(tenant:Tenant) {
      console.log("onClick:" + tenant.userEmail);
      this.showDialog = !this.showDialog;
      this.tenant_email = tenant.userEmail;
    }

}