
import { Component, OnInit, Input, Output, OnChanges, EventEmitter, trigger, 
    state, style, animate, transition } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';

import {SignUpService} from '../services/signup.service';
import {ValidationService} from '../services/validation.service';
import {Tenant} from '../../models/tenant';


@Component({
 selector:'signUp-dialog',
 moduleId:module.id,
 templateUrl:'../signup.html',
 styleUrls:['../signup.css'],
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

export class SignUpComponent { 
    @Input() closable = true;
    @Input() visible: boolean;

    submitted = false;
    
    onSubmit() { this.submitted = true; }

    lookingFor = ['Couple', 'Single',
            'Super Hot', 'Weather Changer'];


    userForm: any;
    constructor(private formBuilder: FormBuilder, private signupservice:SignUpService) {
      
    this.userForm = this.formBuilder.group({
      'name': ['', Validators.required],
      'email': ['', [Validators.required, ValidationService.emailValidator]],
      
    });
  }

    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

   // constructor(private signupservice:SignUpService) { }

    ngOnInit() { }

    close() {
        this.visible = false;
        this.visibleChange.emit(this.visible);
    }

    
    signUp(fullName, email, password, city, area: String[], type_of_tenant){
        console.log(fullName);
        console.log(email);
        console.log(password);
        console.log(city);
        console.log(area);

        this.signupservice.signUp(fullName, email, password, city, area, type_of_tenant );

    }

}