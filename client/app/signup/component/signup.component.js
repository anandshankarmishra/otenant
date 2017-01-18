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
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var signup_service_1 = require("../services/signup.service");
var validation_service_1 = require("../services/validation.service");
var SignUpComponent = (function () {
    function SignUpComponent(formBuilder, signupservice, router) {
        this.formBuilder = formBuilder;
        this.signupservice = signupservice;
        this.router = router;
        this.closable = true;
        this.submitted = false;
        this.type_of_tenant = ['Couple', 'Single',
            'Super Hot', 'Weather Changer'];
        //Print the result of SignUpService
        this.sucx = 0; //set 1 for sign up success, 2 for error
        this.signUpMessage = "";
        this.successMsg = "Congratulations! You have successfully signed up to Otenant.";
        this.errorDupEmailMsg = " This email already exists . Please try again with a different email id";
        this.visibleChange = new core_1.EventEmitter();
        //check if the 2 passwords match
        this.nomatch = false;
        this.signUpForm = this.formBuilder.group({
            'name': ['', forms_1.Validators.required],
            'email': ['', [forms_1.Validators.required, validation_service_1.ValidationService.emailValidator]],
            'password': ['', [forms_1.Validators.required, validation_service_1.ValidationService.passwordValidator]],
            'repassword': ['', [forms_1.Validators.required, validation_service_1.ValidationService.passwordValidator]],
            'city': ['', forms_1.Validators.required],
            'area': ['', forms_1.Validators.required],
            'type_of_tenant': ['', forms_1.Validators.required]
        });
    }
    SignUpComponent.prototype.onSubmit = function () { this.submitted = true; };
    SignUpComponent.prototype.close = function () {
        this.visible = false;
        this.visibleChange.emit(this.visible);
        this.sucx = 0;
    };
    SignUpComponent.prototype.saveUser = function () {
        if (this.signUpForm.value.password != this.signUpForm.value.repassword) {
            this.nomatch = true;
            return;
        }
        if (this.signUpForm.dirty && this.signUpForm.valid) {
            this.signUp(this.signUpForm.value.name, this.signUpForm.value.email, this.signUpForm.value.password, this.signUpForm.value.city, this.signUpForm.value.area, this.signUpForm.value.type_of_tenant);
        }
    };
    //calls signUp service
    SignUpComponent.prototype.signUp = function (fullName, email, password, city, area, type_of_tenant) {
        var _this = this;
        this.signupservice.signUp(fullName, email, password, city, area, type_of_tenant)
            .subscribe(function (result) {
            if (result == false) {
                _this.sucx = 1;
                _this.signUpMessage = _this.successMsg;
            }
            else {
                _this.sucx = 2;
                _this.signUpMessage = _this.errorDupEmailMsg;
            }
        });
        //this.close();
    };
    return SignUpComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], SignUpComponent.prototype, "closable", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], SignUpComponent.prototype, "visible", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], SignUpComponent.prototype, "visibleChange", void 0);
SignUpComponent = __decorate([
    core_1.Component({
        selector: 'signUp-dialog',
        moduleId: module.id,
        templateUrl: '../signup.html',
        styleUrls: ['../signup.css'],
        animations: [
            core_1.trigger('dialog', [
                core_1.transition('void => *', [
                    core_1.style({ transform: 'scale3d(.2, .2, .2)' }),
                    core_1.animate(100)
                ]),
                core_1.transition('* => void', [
                    core_1.animate(100, core_1.style({ transform: 'scale3d(.0, .0, .0)' }))
                ])
            ])
        ]
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        signup_service_1.SignUpService,
        router_1.Router])
], SignUpComponent);
exports.SignUpComponent = SignUpComponent;
//# sourceMappingURL=signup.component.js.map