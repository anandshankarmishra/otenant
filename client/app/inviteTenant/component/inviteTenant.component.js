"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var inviteTenant_services_1 = require("../services/inviteTenant.services");
var validation_service_1 = require("../../common/validation/services/validation.service");
var forms_1 = require("@angular/forms");
var InviteTenantComponent = (function () {
    function InviteTenantComponent(formBuilder, inviteTenantservice) {
        this.formBuilder = formBuilder;
        this.inviteTenantservice = inviteTenantservice;
        //Print result of inviteTenantservice {success|| failure}
        this.success = 0; //set 1 on success, 2 on failure
        this.inviteMsg = "";
        this.successMsg = "You have successfully invited ";
        this.errorMsg = "There was some error. Please invite the tenant again!";
        this.invited = false;
        console.log("Entered the constructor of inviteTenant component");
        //this.tenantEmail = this.config.tenantEmail;
        //this.success = this.config.success;
        this.inviteTenantForm = this.formBuilder.group({
            'name': ['', forms_1.Validators.required],
            'email': ['', [forms_1.Validators.required, validation_service_1.ValidationService.emailValidator]],
            //'contact': ['', [Validators.required, ValidationService.phoneNumValidator]],
            'contact': [''],
            'message': ['']
        });
    }
    InviteTenantComponent.prototype.close = function () {
        //this.visible = false;
        //this.visibleChange.emit(this.visible);
        console.log("called close");
        this.inviteTenantForm = this.formBuilder.group({
            'name': ['', forms_1.Validators.required],
            'email': ['', [forms_1.Validators.required, validation_service_1.ValidationService.emailValidator]],
            //'contact': ['', [Validators.required, ValidationService.phoneNumValidator]],
            'contact': [''],
            'message': ['']
        });
        this.success = 0;
    };
    //if the form is valid, call login service
    InviteTenantComponent.prototype.inviteTenant = function (tenantEmail) {
        var _this = this;
        if (this.inviteTenantForm.dirty && this.inviteTenantForm.valid) {
            console.log("tenant email:" + tenantEmail);
            //this.success = 0; //Re init the success.
            this.inviteTenantservice.inviteTenant(tenantEmail, this.inviteTenantForm.value.name, this.inviteTenantForm.value.email, this.inviteTenantForm.value.contact, this.inviteTenantForm.value.message)
                .subscribe(function (result) {
                if (result == false) {
                    _this.success = 1;
                    _this.inviteMsg = _this.successMsg;
                    _this.invited = true;
                }
                else {
                    _this.success = 2;
                    _this.inviteMsg = _this.errorMsg;
                }
            });
        }
        // this.close();
    };
    return InviteTenantComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], InviteTenantComponent.prototype, "tenantEmail", void 0);
InviteTenantComponent = __decorate([
    core_1.Component({
        selector: 'invite-dialog',
        moduleId: module.id,
        templateUrl: '../inviteTenant.html',
        styleUrls: ['../inviteTenant.css']
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, inviteTenant_services_1.InviteTenantService])
], InviteTenantComponent);
exports.InviteTenantComponent = InviteTenantComponent;
//# sourceMappingURL=inviteTenant.component.js.map