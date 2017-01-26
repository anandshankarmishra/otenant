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
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var tenant_1 = require("../../models/tenant");
var login_service_1 = require("../../login/services/login.service");
var tenantHome_services_1 = require("../../tenantHome/services/tenantHome.services");
var TenantHomeComponent = (function () {
    //private changePswd: boolean = false //
    function TenantHomeComponent(loginService, tenantService, router, http) {
        this.loginService = loginService;
        this.tenantService = tenantService;
        this.router = router;
        this.http = http;
        this.tenant = new tenant_1.Tenant('', '');
        this.showDialog = false;
        this.myTokn = ""; //get tenant profile
        this.myTokn = loginService.getToken();
        console.log("myTokn:" + this.myTokn);
    }
    TenantHomeComponent.prototype.ngOnInit = function () {
        this.getProfile(this.myTokn);
    };
    TenantHomeComponent.prototype.getProfile = function (token) {
        var _this = this;
        this.tenantService.getTenantProfile(token)
            .subscribe(function (data) {
            _this.tenant = (data);
            _this.newNotf = _this.getNewNotifications(_this.tenant);
        });
    };
    TenantHomeComponent.prototype.getNewNotifications = function (tenant) {
        console.log("new not:" + tenant.userNotifications.length);
        return tenant.userNotifications.length;
    };
    TenantHomeComponent.prototype.viewNotifications = function () {
    };
    TenantHomeComponent.prototype.updateName = function (name) {
        var _this = this;
        this.tenantService.updateName(this.myTokn, name)
            .subscribe(function (data) {
            console.log("update error:" + data.error);
            _this.tenant.userFullName = name;
        }, function (err) {
            console.log("upload error:" + err.message);
        });
    };
    TenantHomeComponent.prototype.logout = function () {
        this.loginService.logout();
    };
    TenantHomeComponent.prototype.changePassword = function (password) {
        this.tenantService.changePassword(this.myTokn, password).
            subscribe(function (data) {
            console.log("error:" + data.error);
        });
    };
    TenantHomeComponent.prototype.deleteAccount = function () {
        this.router.navigate(['/deleteAccount']);
    };
    return TenantHomeComponent;
}());
TenantHomeComponent = __decorate([
    core_1.Component({
        selector: 'tenant-view',
        moduleId: module.id,
        templateUrl: '../tenantHome.html',
        styleUrls: ['../tenantHome.css']
    }),
    __metadata("design:paramtypes", [login_service_1.LoginService,
        tenantHome_services_1.TenantService,
        router_1.Router,
        http_1.Http])
], TenantHomeComponent);
exports.TenantHomeComponent = TenantHomeComponent;
//# sourceMappingURL=tenantHome.component.js.map