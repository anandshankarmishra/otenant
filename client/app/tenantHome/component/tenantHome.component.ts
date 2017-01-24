import { Component, OnInit} from '@angular/core';
import {Http, Response, URLSearchParams} from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';

import {Tenant} from '../../models/tenant';
import {LoginService} from '../../login/services/login.service';
import {TenantService} from '../../tenantHome/services/tenantHome.services';



@Component({
 selector:'tenant-view',
 moduleId:module.id,
 templateUrl:'../tenantHome.html',
// styleUrls:['../inviteTenant.css']
})

export class TenantHomeComponent implements OnInit{

    tenant:Tenant = new Tenant('','');
    private showDialog = false;

    private myTokn = "";      //get tenant profile
    private newNotf:number; //new notifications


   
    constructor (private loginService: LoginService,
                    private tenantService: TenantService,
                    private http:Http ) {
                this.myTokn = loginService.getToken();
                console.log("myTokn:" + this.myTokn);
    }

    ngOnInit(){ 
        this.getProfile(this.myTokn);
    }

    getProfile(token) {
        this.tenantService.getTenantProfile(token)
        .subscribe((data) => {

            this.tenant = (data);
            this.newNotf = this.getNewNotifications(this.tenant);
        }
        )
        
        ;
    }

    getNewNotifications(tenant:Tenant) {
        console.log("new not:" + tenant.userNotifications.length);
        return tenant.userNotifications.length;
    }

    viewNotifications() {
        
    }

    updateProfile(token) {

    }
    
    logout() {
        this.loginService.logout();
    }
    
}