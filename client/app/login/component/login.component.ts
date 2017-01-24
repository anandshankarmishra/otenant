import { Component, OnInit, Input, Output, OnChanges, EventEmitter, trigger, 
    state, style, animate, transition, NgModule } from '@angular/core';

import {Router} from '@angular/router';
import {LoginService} from '../services/login.service';
import {ValidationService} from '../../commonServices/validation.service';
import { FormBuilder, Validators } from '@angular/forms';

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

    //if user enters invalid username/password
    private invalid:boolean = false;
    private invalidMsg = "Invalid username/passoword. Try again!";

    //if user is already logged in
    private loggedIn = false;
    private loggedInMsg = "You are already logged in!" ;

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
    }

    

//if the form is valid, call login service
     login() {
        if (this.loginForm.dirty && this.loginForm.valid) {
             let login = this.loginservice.login(
                this.loginForm.value.email, 
                this.loginForm.value.password);

                login.then((res) =>
                  {
                    if(res) {
                        console.log("in logincomp suc:");
                        this.loggedIn = true;
                        this.close();
                        this.router.navigate([this.tenantURL]);
                        }
                        else {
                          console.log('Invalid user');
                          this.loggedIn = false;
                          this.invalid = true;
                        }                    
                  })  
        }
    }

}