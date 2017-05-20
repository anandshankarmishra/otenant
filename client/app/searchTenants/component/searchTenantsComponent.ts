import { Component, OnInit, Input,Output, NgModule, EventEmitter, HostListener,Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import {SearchTenantsService} from '../services/searchTenants.services';
import {Tenant } from '../../models/tenant';  
import {IMultiSelectOption,IMultiSelectSettings,IMultiSelectTexts} from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';
import { DOCUMENT } from '@angular/platform-browser';



@Component({
 selector:'searchTenants-view',
 moduleId:module.id,
 templateUrl:'../searchTenants.html',
 styleUrls:['../style-tenant-home.css','../searchTenants.css']   
})

export class SearchTenantsComponent implements OnInit {
    showDialog = false;
    tenant_email:string ='';
    
   private errorCityEmpty="The city field can not be empty, please supply a value.";
    private errorMsg = "";
    private searchCity; private searchAreas; private typesOfTenant:string[];
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
        defaultTitle: 'Select test',
    };

    private searchedTenants:Tenant[] = [];
    //tenant_email:string ='';    
    
    private dontSearchFurther = false; 
    
    private numOfTenantsToShow:number = 20; // number of tenants to show on page at any given time
    private index = 0; //on every scroll, index will be set to fetch next numOfTenantsToShow Tenants

    constructor (private searchTenantsService: SearchTenantsService,
                 private route: ActivatedRoute,            
         ) {    }

    ngOnInit() {

      console.log("cameFromHomePage ngoninit:");
      let desired_city = this.route.snapshot.queryParams["desired_city"];
      let desired_area = this.route.snapshot.queryParams["desired_areas"];
      let types_of_tenant = this.route.snapshot.queryParams["types_of_tenant"];
      let index = this.route.snapshot.queryParams["index"];
      let limit = this.route.snapshot.queryParams["limit"];

      //populate these values in form ... write code
      this.searchCity = desired_city;
      this.searchAreas = desired_area;
      if(types_of_tenant != undefined && types_of_tenant != null)
      this.selectedOptions = types_of_tenant.split(',');
      
      //call search function if at least a single parameter is provided
      if(desired_city != undefined || desired_area != undefined || types_of_tenant != undefined ) {
        this.getTenants(desired_city, desired_area, types_of_tenant, index, limit);
      }
      
      //track scroll
      
    
    }// end of ngOnInit

  
  
    getTenants(desired_city, desired_area, type_of_tenant, indx, limt): void {
      
              console.log("here in gettenants of seachTenantComponent")
                
              this.searchTenantsService.searchTenants(desired_city, desired_area, type_of_tenant, indx, limt)
              .subscribe(
                result=> 
                {
                  console.log("result length:" + result.length);
                  if (result.length % 20 !=0) {
                    console.log("from %20 wala if");
                    console.log(result);
                    result.map(te => this.searchedTenants.push(te));
                    this.dontSearchFurther = true;
                    return;
                    
                  } else {
                  console.log("from %20 wala else");
                  result.map(te => this.searchedTenants.push(te));
                  console.log("index:" + this.index);
                  }
                }
                );
                
      }
      
      onClickResetAndSearch(desired_city, desired_area, type_of_tenant) {
        //reset Array
        this.searchedTenants = [];
        this.index = 0;
        this.getTenants(desired_city, desired_area, type_of_tenant, this.index, this.numOfTenantsToShow);
      }
      
          handlePageScrollEvent(event){
          console.log("handle scroll:");
          this.index = this.index + this.numOfTenantsToShow;
          this.getTenants(this.searchCity,this.searchAreas,this.typesOfTenant,this.index, this.numOfTenantsToShow);
       }
      
      onChange(event){
      console.log("got following from search form");
      console.log(event);
    }   
    
    onClickInvite(tenant:Tenant) {
      console.log("onClickInvite:" + tenant.userEmail);
      this.tenant_email = tenant.userEmail;
    }
}




@Component({
    selector: 'track-scroll',
    template: ''
})
export class TrackScrollComponent {
   constructor(@Inject(DOCUMENT) private document: Document){}
   
   @Input()
   dontEmit;
   
   
   @Output()
    pageScrolled = new EventEmitter();  
    
  @HostListener('window:scroll', ['$event'])
    track(event) {
    
    var windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    var body = document.body, html = document.documentElement;
    var docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    var windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
        if (this.dontEmit == true) {
            console.log("dontEmit:" + this.dontEmit);
            return;
        }
        console.log('valid event');
        this.pageScrolled.emit();
    }
    }
}