
import { Component, OnInit, Input, Output, OnChanges, EventEmitter, trigger, 
    state, style, animate, transition,} from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {SignUpService} from '../services/signup.service';
import {ValidationService} from '../services/validation.service';
import {Constants} from '../../stringconstants';
import { PasswordValidation } from './password-validation';

declare var jQuery:any;

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
    //@Input() closable = true;
    //@Input() visible: boolean;

    //private submitted = false;
    
    //onSubmit() { this.submitted = true; }

    private type_of_tenant = ['Family','Bachelor Boy','Bachelor Girl','Group of Boys','Group of Girls','Unmarried Couple', 'Others'];
    //SignUp Form Object for validation, control etc
    private signUpForm: any;

    //Print the result of SignUpService
    private sucx: number = 0; //set 0 for sign up form,  1 for sign up success, 2 for error
    private signUpMessage:string = "";
    //private successMsg = "Congratulations! You have successfully signed up to Otenant."
    private successMsg = Constants.successfulSignupMsg;
    private errorDupEmailMsg = Constants.errorDupEmailMsg ;


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
      
    },{
      validator: PasswordValidation.MatchPassword
    });
  }

    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();


    close() {
        //this.visible = false;
        //this.visibleChange.emit(this.visible);
        this.sucx = 0;
        this.signUpMessage = "";
        jQuery("#myModal2").modal("hide");
        
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
        this.signUpForm.value.type_of_tenant
      );
    }

  }
  


  //calls signUp service
    signUp(fullName, email, password, city, area: String[], type_of_tenant){               
        //['Family','Bachelor Boy','Bachelor Girl','Group of Boys','Group of Girls','Unmarried Couple', 'Others'];
        if(type_of_tenant == "Family")
          type_of_tenant = "FAM";
        else if(type_of_tenant == "Bachelor Boy")
          type_of_tenant = "BB";
        else if(type_of_tenant == "Bachelor Girl")
          type_of_tenant = "BG";
        else if(type_of_tenant == "Group of Boys")
          type_of_tenant = "GOB";
        else if(type_of_tenant == "Group of Girls")
          type_of_tenant = "GOG";
        else if(type_of_tenant == "Unmarried Couple")
          type_of_tenant = "UC";
        else if(type_of_tenant == "Others")
          type_of_tenant = "OTH";  
        this.signupservice.signUp( fullName, email, password, 
                            city, area, type_of_tenant )
        .subscribe( result=> 
        {
          if (result == false) {
           this.sucx = 1;
           this.signUpMessage = this.successMsg;
          }
          else { 
            //error in signin up
            this.sucx = 2;
            this.signUpMessage = this.errorDupEmailMsg;
           // this.signUpForm.reset();
          }
        });

        //this.close();
    }

  }

