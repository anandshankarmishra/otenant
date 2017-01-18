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
var login_service_1 = require("../services/login.service");
var validation_service_1 = require("../../commonServices/validation.service");
var forms_1 = require("@angular/forms");
var LoginComponent = (function () {
    function LoginComponent(formBuilder, loginservice) {
        this.formBuilder = formBuilder;
        this.loginservice = loginservice;
        this.closable = true;
        this.visibleChange = new core_1.EventEmitter();
        //if user enters invalid username/password
        this.invalid = false;
        this.invalidMsg = "Invalid username/passoword. Try again!";
        this.loginForm = this.formBuilder.group({
            'email': ['', [forms_1.Validators.required, validation_service_1.ValidationService.emailValidator]],
            'password': ['', [forms_1.Validators.required]]
        });
    }
    LoginComponent.prototype.close = function () {
        this.visible = false;
        this.visibleChange.emit(this.visible);
    };
    //if the form is valid, call login service
    LoginComponent.prototype.login = function () {
        var _this = this;
        if (this.loginForm.dirty && this.loginForm.valid) {
            this.loginservice.login(this.loginForm.value.email, this.loginForm.value.password)
                .subscribe(function (result) {
                if (result == false) {
                    _this.close();
                    console.log(" logged in!");
                }
                else {
                    if (result == "invalid") {
                        _this.invalid = true;
                    }
                }
            });
        }
        //  this.close();
    };
    return LoginComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], LoginComponent.prototype, "closable", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], LoginComponent.prototype, "visible", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], LoginComponent.prototype, "visibleChange", void 0);
LoginComponent = __decorate([
    core_1.Component({
        selector: 'login-dialog',
        moduleId: module.id,
        templateUrl: '../login.html',
        styleUrls: ['../login.css'],
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
    __metadata("design:paramtypes", [forms_1.FormBuilder, login_service_1.LoginService])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map