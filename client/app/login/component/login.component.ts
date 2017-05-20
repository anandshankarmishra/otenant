import { Component, OnInit, Input, Output, OnChanges, EventEmitter, trigger, 
    state, style, animate, transition, NgModule } from '@angular/core';

import {Router} from '@angular/router';
import {LoginService} from '../services/login.service';
import {ValidationService} from '../../commonServices/validation.service';
import { FormBuilder, Validators } from '@angular/forms';
import {Constants} from '../../stringconstants';
declare var jQuery:any;

@Component({
 selector:'login-dialog',
 moduleId:module.id,
 templateUrl:'../login.html',
 styleUrls:['../login.css'],
 animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})

export class LoginComponent { 
    @Input() closable = true;
    @Input() visible: boolean;
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    loginForm: any;
    private tokn = "auth_key";

    //if user enters invalid username/password
    private invalid:boolean = false;
    private invalidLoginMsg = Constants.invalidLoginMsg;

    //if user is already logged in
    private loggedIn = false;
    private loggedInMsg = Constants.loggedInMsg;

    //navigate to Tenant Home
    private tenantURL = "/home";

    constructor(private formBuilder: FormBuilder, 
                private loginservice:LoginService,
                private router:Router) {

      this.loginForm = this.formBuilder.group({
      'email': ['', [Validators.required, ValidationService.emailValidator]],
      'password': ['', [Validators.required]]
      
      });
    }

    close() {
        this.visible = false;
        this.visibleChange.emit(this.visible);
        jQuery( ".modal-backdrop.in").removeClass("modal-backdrop");       
    }

    

//if the form is valid, call login service
     login() {
        if (this.loginForm.dirty && this.loginForm.valid) {
          this.loginservice.login(this.loginForm.value.email, 
                  this.loginForm.value.password).
                  subscribe((data)=> {
                    console.log("data.status" + data.status);
                    if(data.status == 200) {
                      console.log("in logincomp suc:");
                      window.localStorage.setItem(this.tokn, data.json().token);

                      // //set tenant detail
                      // this.tenant = new Tenant();
                      // this.tenant.userFullName = data.json().userFullName;
                      // this.tenant.userEmail = data.json().userEmail;
                      // this.tenant.userCurrentArea = data.json().userCurrentArea;
                      // this.tenant.userCurrentCity = data.json().userCurrentCity;
                      // this.tenant.userDesiredArea = data.json().userDesiredArea;
                      // this.tenant.userDesiredCity = data.json().userDesiredCity;
                      // this.tenant.userPhoneNo = data.json().userPhoneNo;
                      // this.tenant.userRequirementDescription = data.json().userRequirementDescription

                      // console.log("tenant details");
                      // console.log(data.json().userFullName);

                      this.loggedIn = true;
                      this.close();
                      this.router.navigate([this.tenantURL]);
                    } 
                  },
                  (error) => {
                    console.log("Error in login." + JSON.stringify(error));
                    if (error.status == 401) {
                        console.log('Invalid user');
                          this.loggedIn = false;
                          this.invalid = true;
                    }
                  })
          }
    }

}