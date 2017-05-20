import { Component, OnInit, Input, Output, OnChanges, EventEmitter, trigger, 
    state, style, animate, transition, NgModule } from '@angular/core';

import {InviteTenantService} from '../services/inviteTenant.services';
import {ValidationService} from '../../common/validation/services/validation.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
 selector:'invite-dialog',
 moduleId:module.id,
 templateUrl:'../inviteTenant.html',
 styleUrls:['../inviteTenant.css']
})

export class InviteTenantComponent { 

    @Input() tenantEmail:string;
    inviteTenantForm: any;
    
    //Print result of inviteTenantservice {success|| failure}
    private success:number = 0; //set 1 on success, 2 on failure
    private inviteMsg = "";
    private successMsg = "You have successfully invited ";
    private errorMsg = "There was some error. Please invite the tenant again!";
    private invited: boolean = false;

    constructor(private formBuilder: FormBuilder, private inviteTenantservice:InviteTenantService) {

        this.inviteTenantForm = this.formBuilder.group({
        'name': ['', Validators.required],
        'email': ['', [Validators.required, ValidationService.emailValidator]],
        'contact': ['', [Validators.required, ValidationService.phoneNumValidator]],
        'message': ['']
        });
        
    }

    close() {
        //this.visible = false;
        //this.visibleChange.emit(this.visible);
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
            )
            .subscribe(result=> 
            {
              if (result == false) {
                this.success = 1;
                this.inviteMsg = this.successMsg;
                this.invited = true;
              } else {
                this.success = 2;
                this.inviteMsg = this.errorMsg;
              }
            }
            )
    }
   // this.close();

  }
}