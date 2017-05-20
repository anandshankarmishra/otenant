import { Component, Input, OnInit,NgZone} from '@angular/core';
import {Http} from '@angular/http';
import { Router} from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import {Tenant} from '../../models/tenant';
import {LoginService} from '../../login/services/login.service';
import {TenantService} from '../../tenantHome/services/tenantHome.services';

import {ValidationService} from '../../common/validation/services/validation.service';


@Component({
 selector:'updateProfile-view',
 moduleId:module.id,
 templateUrl:'../updateProfile.html'
 //styleUrls:['../tenantHome.css']
})

export class UpdateProfileComponent implements OnInit {

    @Input() tenant = new Tenant();
    private updateProfileForm;
    private myTokn:string;
    private editUser:boolean = false;

    constructor(private loginServicee: LoginService, 
                private tenantService: TenantService) {
        console.log("I am inside the constructor of updateProfileComponent");        
        this.myTokn = loginServicee.getToken();
    }

    ngOnInit() {
        // this.getProfile(this.myTokn);
        //Build the Update Profile Form
        console.log("Ng on init Tenant" + JSON.stringify(this.tenant));
        let formB = new FormBuilder();      
        this.updateProfileForm = formB.group({
            'userCurrentArea': [''],
            'userPhoneNo': [''
                        ,[ValidationService.phoneNumValidator]],
            'userDesiredCity': [''],
            'userDesiredArea': [''],
            'userRequirementDescription' : ['']
        });
    }

    //  getProfile(token) {
    //     this.tenantService.getTenantProfile(token)
    //     .subscribe((data) => {
    //         this.tenant = (data);
    //         this.editUser = false;
    //     }, 
    //     (error) => {
    //         console.log("Error" + JSON.stringify(error));
    //     }
    //     );
    // }

    //show the editable textboxes 
    showEditUser() {
        this.editUser = !this.editUser;
    }

    updateProfile() {
        if(this.updateProfileForm.dirty){
            console.log("updating profile:");
            console.log(this.updateProfileForm);
            let tenant = new Tenant();
            //if conditions have been put to fix a bug, the non dirty values were always empty why ?
            if(this.updateProfileForm.controls.userCurrentArea.dirty)
            tenant.userCurrentArea = this.updateProfileForm.controls.userCurrentArea.value;
            if(this.updateProfileForm.controls.userDesiredCity.dirty)
            tenant.userDesiredCity = this.updateProfileForm.value.userDesiredCity;
            if(this.updateProfileForm.controls.userDesiredArea.dirty)
            tenant.userDesiredArea = this.updateProfileForm.value.userDesiredArea;
            if(this.updateProfileForm.controls.userPhoneNo.dirty)
            tenant.userPhoneNo = this.updateProfileForm.value.userPhoneNo;
            if(this.updateProfileForm.controls.userRequirementDescription.dirty)
            tenant.userRequirementDescription = this.updateProfileForm.value.userRequirementDescription;

            console.log("Printing Tenant:"+JSON.stringify(tenant));
            this.tenantService.updateTenantProfile(this.myTokn, tenant).
            subscribe((data) => 
            {
               // this.zone.run(()=> { //to implement individual component reload inside a page
                    this.tenant = data;
                    console.log(this.tenant.userPhoneNo);
               // })
            },
            (err) => {
                console.log("error:" + JSON.stringify(err));
            }
            )

      }
    }
}
