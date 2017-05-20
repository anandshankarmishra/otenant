import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {IMultiSelectOption,IMultiSelectSettings,IMultiSelectTexts} from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';





@Component({
 selector:'homepage',
 moduleId:module.id,
 templateUrl:'../homepage.html',
 styleUrls:['../homepage.css']   
})

export class HomePageComponent implements OnInit { 
    
    private errorCityEmpty="The city field can not be empty, please supply a value.";
    private errorMsg = "";
    private searchCity; private searchAreas; private typesOfTenant:any=[];
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
        checkAll: 'Check all. ',
        uncheckAll: 'Uncheck all',
        checked: 'checked',
        checkedPlural: 'checked',
        searchPlaceholder: 'Search...',
        defaultTitle: 'SELECT TYPE OF TENANTS'
    };

    searchTenantsURL: string = './searchTenants';
    private numOfTenantsToShow:number = 20; // number of tenants to show on page at any given time
    private index = 0; //on every scroll, index will be set to fetch next numOfTenantsToShow Tenants

    constructor(private router: Router) {
    }

  ngOnInit() {

  }
  
  searchTenants(searchCity,searchAreas,typesOfTenant): void {  
     
     console.log(searchCity);
     console.log(searchAreas);
     console.log(typesOfTenant);
     this.searchCity = searchCity;
     this.searchAreas = searchAreas; 
     this.typesOfTenant = typesOfTenant;
      
     this.index = 0;//show results from top
     
     
     if(searchCity == ""){
       this.errorMsg = this.errorCityEmpty;
       return;
     }
     
     this.router.navigate([this.searchTenantsURL],  
        {queryParams:{desired_city: this.searchCity,
                      desired_areas: this.searchAreas,
                    types_of_tenant: this.typesOfTenant,
                  index: this.index,
                limit:this.numOfTenantsToShow} }
        );
      
    }
    
    onChange(event){
      console.log("got following from search form");
      console.log(event);
    }   

}