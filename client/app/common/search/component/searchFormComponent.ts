import { Component, OnInit, Input,Output, NgModule, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import {SearchFormService} from '../services/searchForm.service';
import{Tenant } from '../../../models/tenant';


@Component({
 selector:'searchForm-view',
 moduleId:module.id,
 templateUrl:'../searchForm.html',
 styleUrls:['../searchForm.css']   
})

export class SearchFormComponent {
       
    showDialog = false;
    tenant_email:string ='';
   
    @Output()
    tenantsSearched = new EventEmitter();
    
    @Output()
    resetTenantsArray = new EventEmitter();
    
    tenants: Tenant[] = [];
    
    private dontSearchFurther = false; 
    
    private numOfTenantsToShow:number = 20; // number of tenants to show on page at any given time
    private index = 0; //on every scroll, index will be set to fetch next numOfTenantsToShow Tenants
    
    searchForm: any; 

    constructor (private searchFormService: SearchFormService,
                 private route: ActivatedRoute,
                 private formBuilder: FormBuilder,
                 private router: Router            
         ) {
        
        this.searchForm = this.formBuilder.group({
          'searchCity': ['', Validators.required],
          'searchArea': ['' ],
          'search_type_of_tenant' : ['']
        });
    }
  
  getTenants(desired_city, desired_area, type_of_tenant, indx, limt): void {
  this.searchFormService.searchTenants(desired_city, desired_area, type_of_tenant, indx, limt)
  .subscribe(
    result=> 
    {
      //this.tenants =(result)
      if (result.length % 20 !=0) {
        this.dontSearchFurther = true;
        return;
        //this.tenantsSearched.emit(this.dontSearchFurther); 
      } else {
        this.tenantsSearched.emit(result);
     // this.index = this.index + this.rsltsToShow;
       console.log("index:" + this.index);
      }
      
    }
    );
  }

  
  
  
   searchTenants(): void {  
     
      if (this.searchForm.dirty && this.searchForm.valid) {
            this.index = 0;//show results from top
            this.dontSearchFurther = false;
            //this.resetTenantArray = true;
            
            this.resetTenantsArray.emit(true);
            
            console.log(this.searchForm.value.searchCity,
                      this.searchForm.value.searchArea,
                      this.searchForm.value. search_type_of_tenant);
            this.getTenants(this.searchForm.value.searchCity,
                      this.searchForm.value.searchArea,
                      this.searchForm.value. search_type_of_tenant, this.index, this.numOfTenantsToShow);
      }
    }

    handlePageScrollEvent(event){
      console.log("From searchForm Component:");
      this.index = this.index + this.numOfTenantsToShow;
      
       this.getTenants(this.searchForm.value.searchCity,
                      this.searchForm.value.searchArea,
                      this.searchForm.value. search_type_of_tenant, this.index, this.numOfTenantsToShow);
       
    }


    // onClick(tenant:Tenant) {
    //   console.log("onClick:" + tenant.userEmail);
    //   this.showDialog = !this.showDialog;
    //   this.tenant_email = tenant.userEmail;
    // }
    

}