
import { Component, OnInit, Input, Output, OnChanges, EventEmitter, trigger, 
    state, style, animate, transition } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';

import {SignUpService} from '../services/signup.service';
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


    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private signupservice:SignUpService, public fb: FormBuilder) { }

    ngOnInit() { }

    close() {
        this.visible = false;
        this.visibleChange.emit(this.visible);
    }

    public loginForm = this.fb.group({
    email: ["", Validators.required],
    password: ["", Validators.required]
  });
  
    doLogin(event) {
    console.log(event);
    console.log(this.loginForm.value);
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