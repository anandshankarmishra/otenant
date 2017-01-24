
import { Component, OnInit, Input, Output, OnChanges, EventEmitter, trigger, 
    state, style, animate, transition,} from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {SignUpService} from '../services/signup.service';
import {ValidationService} from '../services/validation.service';


@Component({
 selector:'signUp-dialog',
 moduleId:module.id,
 templateUrl:'../signup.html',
 styleUrls:['../signup.css'],
 /*animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.2, .2, .2)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]*/
})

export class SignUpComponent { 
    @Input() closable = true;
    @Input() visible: boolean;

    private submitted = false;
    
    onSubmit() { this.submitted = true; }

    private type_of_tenant = ['Couple', 'Single',
            'Super Hot', 'Weather Changer'];

    //SignUp Form Object for validation, control etc
    private signUpForm: any;

    //Print the result of SignUpService
    private sucx: number = 0; //set 0 for sign up form,  1 for sign up success, 2 for error
    private signUpMessage:string = "";
    private successMsg = "Congratulations! You have successfully signed up to Otenant."
    private errorDupEmailMsg = " This email already exists . Please try again with a different email id";


    constructor(private formBuilder: FormBuilder, 
                private signupservice:SignUpService,
                private router:Router) {
      
    
    this.signUpForm = this.formBuilder.group({
      'name': ['', Validators.required],
      'email': ['', [Validators.required, ValidationService.emailValidator]],
      'password': ['', [Validators.required, ValidationService.passwordValidator]],
      'repassword': ['', [Validators.required, ValidationService.passwordValidator]],
      'city': ['', Validators.required],
      'area': ['', Validators.required],
      'type_of_tenant' : ['', Validators.required]
      
    });
  }

    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();


    close() {
        this.visible = false;
        this.visibleChange.emit(this.visible);
        this.sucx = 0;
    }

    //check if the 2 passwords match
    public nomatch = false;

    saveUser() {
      if (this.signUpForm.value.password != this.signUpForm.value.repassword) {
        this.nomatch = true;
        return;
      }

  

    if (this.signUpForm.dirty && this.signUpForm.valid) {
      this.signUp(
        this.signUpForm.value.name,
        this.signUpForm.value.email,
        this.signUpForm.value.password,
        this.signUpForm.value.city,
        this.signUpForm.value.area,
        this.signUpForm.value.type_of_tenant,
      
      );
    }

  }

  //calls signUp service
    signUp(fullName, email, password, city, area: String[], type_of_tenant){               

        this.signupservice.signUp( fullName, email, password, 
                            city, area, type_of_tenant )
        .subscribe( result=> 
        {
          if (result == false) {
           this.sucx = 1;
           this.signUpMessage = this.successMsg;
          }
          else { 
            this.sucx = 2;
            this.signUpMessage = this.errorDupEmailMsg;
          }
        });

        //this.close();
    }

  }

