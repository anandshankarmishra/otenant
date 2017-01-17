import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';





@Component({
 selector:'homepage',
 moduleId:module.id,
 templateUrl:'../homepage.html',
 styleUrls:['../homepage.css']   
})

export class HomePageComponent implements OnInit { 
    
    showDialog = false;
    showLoginDialog = false;
  
    searchTenantsURL: string = './searchTenants';
    
    //for user to fill search details
    searchForm: any;
    
    
    constructor(private formBuilder: FormBuilder, 
                private router: Router) {
      
        //Build search form with validators
        this.searchForm = this.formBuilder.group({
          'searchCity': ['', Validators.required],
          'searchArea': ['', [Validators.required]],
          'search_type_of_tenant' : ['', Validators.required]
          
        });
    }

  ngOnInit() {

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


}