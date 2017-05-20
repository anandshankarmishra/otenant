import { Component, OnInit, Input,Output, NgModule, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import {SearchFormService} from '../services/searchForm.service';
import{Tenant } from '../../../models/tenant';
import {IMultiSelectOption,IMultiSelectSettings,IMultiSelectTexts} from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';



@Component({
 selector:'searchForm-view',
 moduleId:module.id,
 templateUrl:'../searchForm.html',
 styleUrls:['../searchForm.css']   
})

export class SearchFormComponent {

    private errorCityEmpty="The city field can not be empty, please supply a value.";
    private errorMsg = "";
    private searchCity; private searchAreas; private typesOfTenant;
    private selectedOptions: String[];
    private myOptions: IMultiSelectOption[] = [
        { id: 'GOG', name: 'GROUP OF GIRLS' },
        { id: 'BB', name: 'BACHELOR BOY' },
        { id: 'FAM', name: 'FAMILY' },
        { id: 'BG', name: 'BACHELOR GIRL' },
        { id: 'GOB', name: 'GROUP OF BOYS' },
        { id: 'UC', name: 'UNMARRIED COUPLE' },
        { id: 'OTH', name: 'OTHERS' }
    ];
      private searchTenantsURL: string = './searchTenants';    
      private mySettings: IMultiSelectSettings = {
        pullRight: false,
        enableSearch: false,
        checkedStyle: 'checkboxes',
        buttonClasses: 'btn btn-default',
        selectionLimit: 0,
        closeOnSelect: false,
        showCheckAll: true,
        showUncheckAll: true,
        dynamicTitleMaxItems: 0,
        maxHeight: '300px',
    };

    private myTexts: IMultiSelectTexts = {
        checkAll: 'Check all',
        uncheckAll: 'Uncheck all',
        checked: 'checked',
        checkedPlural: 'checked',
        searchPlaceholder: 'Search...',
        defaultTitle: 'Select',
    };


    showDialog = false;
    tenant_email:string ='';
   
    @Input()
    cameFromHomePage;
    
    @Output()
    tenantsSearched = new EventEmitter();
    
    @Output()
    resetTenantsArray = new EventEmitter();
    
    tenants: Tenant[] = [];
    
    private dontSearchFurther = false; 
    
    private numOfTenantsToShow:number = 20; // number of tenants to show on page at any given time
    private index = 0; //on every scroll, index will be set to fetch next numOfTenantsToShow Tenants

    constructor (private searchFormService: SearchFormService,
                 private route: ActivatedRoute,
                 private router: Router            
         ) {}
         
    ngOnInit() {

      console.log("cameFromHomePage ngoninit");
      console.log(this.cameFromHomePage);
      // console.log(this.route);
      // let desired_city = this.route.snapshot.queryParams["desired_city"];
      // console.log("ngoninit city: " + desired_city);
      // let desired_area = this.route.snapshot.queryParams["desired_areas"];
      // console.log("ngoninit area: " + desired_area);
      // let types_of_tenant = this.route.snapshot.queryParams["types_of_tenant"];
      // console.log("ngoninit types_of_tenant: " + types_of_tenant);
      // let index = this.route.snapshot.queryParams["index"];
      // console.log("ngoninit index: " + index);
      // let limit = this.route.snapshot.queryParams["limit"];
      // console.log("ngoninit limit: " + limit);

    
      // this.getTenants(desired_city, desired_area, types_of_tenant,index,limit);
    }// end of ngOnInit
  
  getTenants(desired_city, desired_area, type_of_tenant, indx, limt): void {
  

  console.log("here in gettenants of seachFormComponent")
     
  this.searchFormService.searchTenants(desired_city, desired_area, type_of_tenant, indx, limt)
  .subscribe(
    result=> 
    {

      if (result.length % 20 !=0) {
        console.log("from %20 wala if"+result);
        console.log(result);
        this.tenantsSearched.emit(result);
        this.dontSearchFurther = true;
        return;
         
      } else {
       console.log("from %20 wala else"+result);
       this.tenantsSearched.emit(result);
       console.log("index:" + this.index);
      }
      
    }
    );
  }

  
  
  
   searchTenants(searchCity,searchAreas,typesOfTenant): void {  
     
     console.log(searchCity);
     console.log(searchAreas);
     console.log(typesOfTenant);
     this.searchCity = searchCity;
     this.searchAreas = searchAreas; 
     this.typesOfTenant = typesOfTenant;
      
     this.index = 0;//show results from top
     this.dontSearchFurther = false;
     this.resetTenantsArray.emit(true);
     
     if(searchCity == ""){
       this.errorMsg = this.errorCityEmpty;
       return;
     }
     
     this.getTenants(searchCity,searchAreas,typesOfTenant,this.index, this.numOfTenantsToShow);
      
    }
   
    handlePageScrollEvent(event){
      console.log("From searchForm Component:");
      this.index = this.index + this.numOfTenantsToShow;
      this.getTenants(this.searchCity,this.searchAreas,this.typesOfTenant,this.index, this.numOfTenantsToShow);
    }

    onChange(event){
      console.log("got following from search form");
      console.log(event);
    }    

}