import { Component, OnInit} from '@angular/core';
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
 styleUrls:['../tenantHome.css']
})

export class TenantHomeComponent implements OnInit{

    tenant:Tenant = new Tenant('','');
    private showDialog = false;

    private myTokn = "";      //get tenant profile
    private newNotf:number; //new notifications
   
    private chngPswd: boolean = false //
    private chngPswdForm;
    private nomatch = false;
    private errorMsg = '';
    private successPswdMsg = 'Password changed successfully!';
    private incorrectPswdError = "You entered incorrect current password. Try again!"
    
    private editUser: boolean = false; // 

    constructor (private loginService: LoginService,
                    private tenantService: TenantService,
                    private router: Router,
                    private http:Http ) {
                this.myTokn = loginService.getToken();
                console.log("myTokn:" + this.myTokn);
    }

    ngOnInit(){ 
        this.getProfile(this.myTokn);

        let formB = new FormBuilder();

        /*this.chngPswdForm = formB.group({
            'cur_pswd': ['', [Validators.required, ValidationService.passwordValidator]],
            'new_pswd': ['', [Validators.required, ValidationService.passwordValidator]],
            'new_repswd': ['', [Validators.required, ValidationService.passwordValidator]],
            });*/
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

    updateName(name:string) {
        this.tenantService.updateName(this.myTokn, name)
        .subscribe(
            (data) => {
                console.log("update error:" + data.error);
                this.tenant.userFullName = name;
            },
            (err) => {
                console.log("upload error:" + err.message);
            }
        )
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

    showEditUser() {
        this.editUser = !this.editUser;
    }
    
    updateProfile() {
    
    }

    /*deleteAccount(): boolean {
        this.tenantService.deleteAccount(this.myTokn).
        subscribe((data) => {
            console.log(data.status);
            console.log(data.error);
            if(data.status == 200 && data.error == false) {
                console.log(" account deleted successfully");
                this.router.navigate(['']);
            } 
        },
        (error) => {
            console.log("error deleting account");
        }
        )
        return;
    }*/
}