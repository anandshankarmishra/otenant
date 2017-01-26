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
var router_1 = require("@angular/router");
var tenantHome_services_1 = require("../../tenantHome/services/tenantHome.services");
var login_service_1 = require("../../login/services/login.service");
var DeleteAccountComponent = (function () {
    function DeleteAccountComponent(router, tenantService, loginService) {
        this.router = router;
        this.tenantService = tenantService;
        this.loginService = loginService;
        this.notLoggedInMsg = "You should be logged in to delete this account!";
        this.wrongPasswordMsg = "Wrong password! Please enter correct password to proceed.";
        this.error = '';
    }
    DeleteAccountComponent.prototype.cancel = function () {
        this.router.navigate(['/home']);
    };
    DeleteAccountComponent.prototype.deleteAccount = function (password) {
        var _this = this;
        var token = this.loginService.getToken();
        console.log("password:" + password + " token:" + token);
        if (token && password) {
            this.tenantService.deleteAccount(token, password).
                subscribe(function (data) {
                console.log("data:" + data.error + " status:" + data.status);
                if (data.error == true && data.status == 999) {
                    _this.error = _this.wrongPasswordMsg;
                }
                else if (data.error == false && data.status == 900) {
                    _this.router.navigate(['']);
                }
            }, function (error) {
                console.log("error:" + error.error);
            });
        }
        else {
            this.error = this.notLoggedInMsg;
        }
    };
    return DeleteAccountComponent;
}());
DeleteAccountComponent = __decorate([
    core_1.Component({
        selector: 'delete-view',
        moduleId: module.id,
        templateUrl: '../deleteAccount.html',
    }),
    __metadata("design:paramtypes", [router_1.Router,
        tenantHome_services_1.TenantService,
        login_service_1.LoginService])
], DeleteAccountComponent);
exports.DeleteAccountComponent = DeleteAccountComponent;
//# sourceMappingURL=deleteAccount.component.js.map