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
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var tenant_1 = require("../../models/tenant");
var login_service_1 = require("../../login/services/login.service");
var tenantHome_services_1 = require("../../tenantHome/services/tenantHome.services");
var validation_service_1 = require("../../common/validation/services/validation.service");
var TenantHomeComponent = (function () {
    function TenantHomeComponent(loginService, tenantService, router, http) {
        this.loginService = loginService;
        this.tenantService = tenantService;
        this.router = router;
        this.http = http;
        this.tenant = new tenant_1.Tenant();
        this.showDialog = false;
        this.myTokn = ""; //get tenant profile
        this.chngPswd = false; //
        this.nomatch = false;
        this.errorMsg = '';
        this.successPswdMsg = 'Password changed successfully!';
        this.incorrectPswdError = "You entered incorrect current password. Try again!";
        this.editUser = false; // 
        this.notifications = [];
        console.log("inside constructor of tenanthome");
        this.myTokn = loginService.getToken();
    }
    TenantHomeComponent.prototype.ngOnInit = function () {
        console.log("I am in ngOnInit of tenant home.");
        this.getProfile(this.myTokn);
    };
    TenantHomeComponent.prototype.getProfile = function (token) {
        var _this = this;
        this.tenantService.getTenantProfile(token)
            .subscribe(function (data) {
            _this.tenant = (data);
            _this.name = _this.tenant.userFullName;
            //We may need the following line later, keep it for now, dont delete it.
            //this.newNotf = this.getNewNotifications(this.tenant);
        });
    };
    TenantHomeComponent.prototype.getNewNotifications = function (tenant) {
        console.log("new not:" + tenant.userNotifications.length);
        return tenant.userNotifications.length;
    };
    TenantHomeComponent.prototype.viewNotifications = function () {
    };
    TenantHomeComponent.prototype.logout = function () {
        this.loginService.logout();
    };
    TenantHomeComponent.prototype.showPswdDiv = function () {
        this.chngPswd = !this.chngPswd;
        var formB = new forms_1.FormBuilder();
        this.chngPswdForm = formB.group({
            'cur_pswd': ['', [forms_1.Validators.required, validation_service_1.ValidationService.passwordValidator]],
            'new_pswd': ['', [forms_1.Validators.required, validation_service_1.ValidationService.passwordValidator]],
            'new_repswd': ['', [forms_1.Validators.required, validation_service_1.ValidationService.passwordValidator]],
        });
    };
    TenantHomeComponent.prototype.changePassword = function () {
        var _this = this;
        if (this.chngPswdForm.value.new_pswd != this.chngPswdForm.value.new_repswd) {
            this.nomatch = true;
            return;
        }
        var oldpswd = this.chngPswdForm.value.cur_pswd;
        var newpswd = this.chngPswdForm.value.new_pswd;
        this.tenantService.changePassword(this.myTokn, oldpswd, newpswd).
            subscribe(function (data) {
            console.log("data:" + data.status);
            if (data.status == 900) {
                _this.errorMsg = _this.incorrectPswdError;
            }
            else {
                _this.errorMsg = _this.successPswdMsg;
                _this.chngPswd = false;
            }
        }, function (error) {
            console.log("error:" + JSON.stringify(error));
        });
    };
    TenantHomeComponent.prototype.deleteAccount = function () {
        this.router.navigate(['/deleteAccount']);
    };
    TenantHomeComponent.prototype.onClickNotification = function () {
        var _this = this;
        console.log("clicked notification");
        this.showDialog = !this.showDialog;
        this.tenantService.getNotifications(this.myTokn).
            subscribe(function (data) {
            _this.notifications = data;
        }, function (error) {
            console.log("error! handle me please");
        });
        //   this.emitNotifEvent.emit();
    };
    TenantHomeComponent.prototype.toggleEditUser = function () {
        this.editUser = !this.editUser;
    };
    TenantHomeComponent.prototype.changeUserFullName = function () {
        var _this = this;
        // Make a server call here for updating the user's full name.
        console.log("Got the name as:" + this.name);
        this.editUser = !this.editUser;
        this.tenantService.updateTenantFullName(this.myTokn, this.name).
            subscribe(function (data) {
            _this.tenant = data;
            console.log(data);
        }, function (err) {
            console.log("error:" + JSON.stringify(err));
        });
    };
    return TenantHomeComponent;
}());
TenantHomeComponent = __decorate([
    core_1.Component({
        selector: 'tenant-view',
        moduleId: module.id,
        templateUrl: '../tenantHome.html',
        styleUrls: ['../style-tenant-home.css']
        //  templateUrl:'../tenant-homepage.html',
        //  styleUrls:['../style-tenant-home.css']
    }),
    __metadata("design:paramtypes", [login_service_1.LoginService,
        tenantHome_services_1.TenantService,
        router_1.Router,
        http_1.Http])
], TenantHomeComponent);
exports.TenantHomeComponent = TenantHomeComponent;
//# sourceMappingURL=tenantHome.component.js.map