import { Component, OnChanges, Input} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
 selector:'searchForm-view',
 moduleId:module.id,
 templateUrl:'../searchForm.html',
 styleUrls:['../searchForm.css']   
})

export class SearchFormComponent implements OnChanges { 
    
    searchTenantsURL: string = './searchTenants';
    
    

    //for user to fill search details
    searchForm: any;
    
    constructor(private formBuilder: FormBuilder, 
                private router: Router) {
        
        //Build search form with validators
          this.searchForm = this.formBuilder.group({
            'searchCity': [''],
            'searchArea': [''],
            'search_type_of_tenant' : ['']
            });
    }

  searchTenants(): void {  

      if (this.searchForm.dirty && this.searchForm.valid) {
        this.router.navigate([this.searchTenantsURL], 
        {queryParams:{city: this.searchForm.value.searchCity,
                      area: this.searchForm.value.searchArea,
                    tenantType: this.searchForm.value. search_type_of_tenant} }
        );
       }
  }

  ngOnChanges(){
    console.log("ng on changes!");
  }


}