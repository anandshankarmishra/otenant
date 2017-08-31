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
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var signup_service_1 = require("../services/signup.service");
var validation_service_1 = require("../services/validation.service");
var stringconstants_1 = require("../../stringconstants");
var password_validation_1 = require("./password-validation");
var SignUpComponent = (function () {
    function SignUpComponent(formBuilder, signupservice, router) {
        this.formBuilder = formBuilder;
        this.signupservice = signupservice;
        this.router = router;
        //@Input() closable = true;
        //@Input() visible: boolean;
        //private submitted = false;
        //onSubmit() { this.submitted = true; }
        this.type_of_tenant = ['Family', 'Bachelor Boy', 'Bachelor Girl', 'Group of Boys', 'Group of Girls', 'Unmarried Couple', 'Others'];
        //Print the result of SignUpService
        this.sucx = 0; //set 0 for sign up form,  1 for sign up success, 2 for error
        this.signUpMessage = "";
        //private successMsg = "Congratulations! You have successfully signed up to Otenant."
        this.successMsg = stringconstants_1.Constants.successfulSignupMsg;
        this.errorDupEmailMsg = stringconstants_1.Constants.errorDupEmailMsg;
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
        }, {
            validator: password_validation_1.PasswordValidation.MatchPassword
        });
    }
    SignUpComponent.prototype.close = function () {
        //this.visible = false;
        //this.visibleChange.emit(this.visible);
        this.sucx = 0;
        this.signUpMessage = "";
        jQuery("#myModal2").modal("hide");
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
        //['Family','Bachelor Boy','Bachelor Girl','Group of Boys','Group of Girls','Unmarried Couple', 'Others'];
        if (type_of_tenant == "Family")
            type_of_tenant = "FAM";
        else if (type_of_tenant == "Bachelor Boy")
            type_of_tenant = "BB";
        else if (type_of_tenant == "Bachelor Girl")
            type_of_tenant = "BG";
        else if (type_of_tenant == "Group of Boys")
            type_of_tenant = "GOB";
        else if (type_of_tenant == "Group of Girls")
            type_of_tenant = "GOG";
        else if (type_of_tenant == "Unmarried Couple")
            type_of_tenant = "UC";
        else if (type_of_tenant == "Others")
            type_of_tenant = "OTH";
        this.signupservice.signUp(fullName, email, password, city, area, type_of_tenant)
            .subscribe(function (result) {
            if (result == false) {
                _this.sucx = 1;
                _this.signUpMessage = _this.successMsg;
            }
            else {
                //error in signin up
                _this.sucx = 2;
                _this.signUpMessage = _this.errorDupEmailMsg;
                // this.signUpForm.reset();
            }
        });
        //this.close();
    };
    return SignUpComponent;
}());
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
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        signup_service_1.SignUpService,
        router_1.Router])
], SignUpComponent);
exports.SignUpComponent = SignUpComponent;
//# sourceMappingURL=signup.component.js.map