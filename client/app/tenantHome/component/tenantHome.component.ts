import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Http, Response, URLSearchParams} from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import {Tenant} from '../../models/tenant';
import {LoginService} from '../../login/services/login.service';
import {TenantService} from '../../tenantHome/services/tenantHome.services';

import {ValidationService} from '../../common/validation/services/validation.service';


@Component({
 selector:'tenant-view',
 moduleId:module.id,
 templateUrl:'../tenantHome.html',
 styleUrls:['../style-tenant-home.css']
//  templateUrl:'../tenant-homepage.html',
//  styleUrls:['../style-tenant-home.css']
})

export class TenantHomeComponent implements OnInit{

    tenant:Tenant = new Tenant();
    private showDialog = false;
    private name;
    private myTokn = "";      //get tenant profile
    private newNotf:number; //new notifications
   
    private chngPswd: boolean = false //
    private chngPswdForm;
    private nomatch = false;
    private errorMsg = '';
    private successPswdMsg = 'Password changed successfully!';
    private incorrectPswdError = "You entered incorrect current password. Try again!"
    
    private editUser: boolean = false; // 

    private updateProfileForm;

    private notifications = [];
    
    constructor (private loginService: LoginService,
                    private tenantService: TenantService,
                    private router: Router,
                    private http:Http ) {
            console.log("inside constructor of tenanthome")
            this.myTokn = loginService.getToken();
    }

    ngOnInit(){ 
        console.log("I am in ngOnInit of tenant home.");
        this.getProfile(this.myTokn);
    }

    getProfile(token) {
        this.tenantService.getTenantProfile(token)
        .subscribe((data) => {

            this.tenant = (data);
            this.name = this.tenant.userFullName;
            //We may need the following line later, keep it for now, dont delete it.
            //this.newNotf = this.getNewNotifications(this.tenant);
        });
    }
    getNewNotifications(tenant:Tenant) {
        console.log("new not:" + tenant.userNotifications.length);
            return tenant.userNotifications.length;
    }

    viewNotifications() {
        
    }
    
    logout() {
        this.loginService.logout();
    }
    
    showPswdDiv() {
        this.chngPswd = !this.chngPswd;
        let formB = new FormBuilder();
        this.chngPswdForm = formB.group({
            'cur_pswd': ['', [Validators.required, ValidationService.passwordValidator]],
            'new_pswd': ['', [Validators.required, ValidationService.passwordValidator]],
            'new_repswd': ['', [Validators.required, ValidationService.passwordValidator]],
            });
    }

    changePassword() {
        if (this.chngPswdForm.value.new_pswd != this.chngPswdForm.value.new_repswd) {
            this.nomatch = true;
            return;
        }
        let oldpswd = this.chngPswdForm.value.cur_pswd;
        let newpswd = this.chngPswdForm.value.new_pswd;

        this.tenantService.changePassword(this.myTokn, oldpswd,newpswd).
        subscribe(
            (data)=> {
                console.log("data:" + data.status);
                if(data.status == 900) {
                    this.errorMsg = this.incorrectPswdError;
                } else {
                    this.errorMsg = this.successPswdMsg;
                    this.chngPswd = false;
                }
                
            }, 
            (error)=> {
                console.log("error:" + JSON.stringify(error));
            }
        )
    }

    deleteAccount() {
        this.router.navigate(['/deleteAccount']);
    }

    onClickNotification() {
        console.log("clicked notification");
        this.showDialog = !this.showDialog;
        this.tenantService.getNotifications(this.myTokn).
        subscribe((data)=> {
            this.notifications = data;
        },
        (error)=> {
            console.log("error! handle me please");
        })
     //   this.emitNotifEvent.emit();
    }

    toggleEditUser()
    {
        this.editUser = !this.editUser;
    }

    changeUserFullName()
    {
        // Make a server call here for updating the user's full name.
        console.log("Got the name as:"+ this.name);
        this.editUser = !this.editUser;
        
        this.tenantService.updateTenantFullName(this.myTokn, this.name).
        subscribe((data) => 
        {
            this.tenant = data;
            console.log(data);

        },
        (err) => {
            console.log("error:" + JSON.stringify(err));
        }
        )
    }
}