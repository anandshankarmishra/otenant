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
var signup_service_1 = require("../services/signup.service");
var validation_service_1 = require("../services/validation.service");
var SignUpComponent = (function () {
    function SignUpComponent(formBuilder, signupservice) {
        this.formBuilder = formBuilder;
        this.signupservice = signupservice;
        this.closable = true;
        this.submitted = false;
        this.lookingFor = ['Couple', 'Single',
            'Super Hot', 'Weather Changer'];
        this.visibleChange = new core_1.EventEmitter();
        this.userForm = this.formBuilder.group({
            'name': ['', forms_1.Validators.required],
            'email': ['', [forms_1.Validators.required, validation_service_1.ValidationService.emailValidator]],
        });
    }
    SignUpComponent.prototype.onSubmit = function () { this.submitted = true; };
    // constructor(private signupservice:SignUpService) { }
    SignUpComponent.prototype.ngOnInit = function () { };
    SignUpComponent.prototype.close = function () {
        this.visible = false;
        this.visibleChange.emit(this.visible);
    };
    SignUpComponent.prototype.signUp = function (fullName, email, password, city, area, type_of_tenant) {
        console.log(fullName);
        console.log(email);
        console.log(password);
        console.log(city);
        console.log(area);
        this.signupservice.signUp(fullName, email, password, city, area, type_of_tenant);
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
                    core_1.style({ transform: 'scale3d(.3, .3, .3)' }),
                    core_1.animate(100)
                ]),
                core_1.transition('* => void', [
                    core_1.animate(100, core_1.style({ transform: 'scale3d(.0, .0, .0)' }))
                ])
            ])
        ]
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, signup_service_1.SignUpService])
], SignUpComponent);
exports.SignUpComponent = SignUpComponent;
//# sourceMappingURL=signup.component.js.map