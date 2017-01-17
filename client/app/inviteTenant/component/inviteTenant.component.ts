import { Component, OnInit, Input, Output, OnChanges, EventEmitter, trigger, 
    state, style, animate, transition, NgModule } from '@angular/core';

import {InviteTenantService} from '../services/inviteTenant.services';
import {ValidationService} from '../../commonServices/validation.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
 selector:'invite-dialog',
 moduleId:module.id,
 templateUrl:'../inviteTenant.html',
 styleUrls:['../inviteTenant.css'],

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

export class InviteTenantComponent { 
    @Input() closable = true;
    @Input() visible: boolean;
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input() tenantEmail:string;


    inviteTenantForm: any;
    
    

    constructor(private formBuilder: FormBuilder, private inviteTenantservice:InviteTenantService) {

        this.inviteTenantForm = this.formBuilder.group({
        'name': ['', Validators.required],
        'email': ['', [Validators.required, ValidationService.emailValidator]],
        'contact': ['', Validators.required],
        'message': ['']
        });
        
    }

    close() {
        this.visible = false;
        this.visibleChange.emit(this.visible);
    }

    

//if the form is valid, call login service
     inviteTenant(tenantEmail:string) {
        if (this.inviteTenantForm.dirty && this.inviteTenantForm.valid) {
            console.log("tenant email:" + tenantEmail);
          
            this.inviteTenantservice.inviteTenant(
                        tenantEmail,
                        this.inviteTenantForm.value.name, 
                        this.inviteTenantForm.value.email, 
                        this.inviteTenantForm.value.contact,
                        this.inviteTenantForm.value.message
            );
    }
    this.close();

  }
}