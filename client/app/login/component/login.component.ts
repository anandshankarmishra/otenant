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

    //navigate to Tenant Home
    private tenantURL = "home";

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
              this.loginservice.login(
                this.loginForm.value.email, 
                this.loginForm.value.password)
          .subscribe(result=> 
          {
            if (result == false) {
                this.close();
                this.router.navigate([this.tenantURL]);

              console.log (" logged in!");
            } else {
              if (result == "invalid") {
                this.invalid = true;
              }
            }

          }
          )
    }
  //  this.close();

  }
}