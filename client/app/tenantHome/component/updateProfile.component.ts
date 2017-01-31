import { Component, OnInit,NgZone} from '@angular/core';
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

    private tenant = new Tenant();
    private updateProfileForm;
    private myTokn:string;
    private editUser:boolean = false;

    constructor(private loginServicee: LoginService, 
                private tenantService: TenantService) {
                //private zone:NgZone) {
        this.myTokn = loginServicee.getToken();
        
        
    }

    ngOnInit() {
        this.getProfile(this.myTokn);
        //Build the Update Profile Form
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

     getProfile(token) {
        this.tenantService.getTenantProfile(token)
        .subscribe((data) => {
            this.tenant = (data);
            this.editUser = false;
        }, 
        (error) => {
            console.log("Error" + JSON.stringify(error));
        }
        );
    }

    //show the editable textboxes 
    showEditUser() {
        this.editUser = !this.editUser;
    }

    updateProfile() {
            let tenant = new Tenant();
            tenant.userCurrentArea = this.updateProfileForm.value.userCurrentArea;
            tenant.userDesiredCity = this.updateProfileForm.value.userDesiredCity;
            tenant.userDesiredArea = this.updateProfileForm.value.userDesiredArea;
            tenant.userPhoneNo = this.updateProfileForm.value.userPhoneNo;
            tenant.userRequirementDescription = this.updateProfileForm.value.userRequirementDescription;


            this.tenantService.updateTenantProfile(this.myTokn, tenant).
            subscribe((data) => 
            {
               // this.zone.run(()=> { //to implement individual component reload inside a page
                    this.tenant = data;
                    console.log("reloaded UpdateProfileComponent");
                    console.log(this.tenant.userPhoneNo);
               // })
            },
            (err) => {
                console.log("error:" + JSON.stringify(err));
            }
            )

    }
}
