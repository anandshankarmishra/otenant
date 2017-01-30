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
var http_2 = require("@angular/http");
require("rxjs/add/operator/toPromise");
require("rxjs/add/operator/map");
var app_routes_1 = require("../../app-routes");
var TenantService = (function () {
    //get tenant profile
    //private profileURL = "http://localhost:3005/getUserProfile";
    // profileURL = AppRoutes.getUserProfileURL;
    //private notifURL = "http://localhost:3005/getNotifications";
    //private approvURL = "http://localhost:3005/approveNotification";
    function TenantService(http) {
        this.http = http;
    }
    TenantService.prototype.getTenantProfile = function (token) {
        if (token) {
            var params = new http_1.URLSearchParams();
            params.set("token", token);
            return this.http.get(app_routes_1.AppRoutes.getUserProfileURL, {
                search: params
            })
                .map(function (res) { return res.json(); });
        }
    };
    TenantService.prototype.getNotifications = function (token) {
        if (token) {
            var params = new http_1.URLSearchParams();
            params.set("token", token);
            //return this.http.get(this.notifURL, 
            return this.http.get(app_routes_1.AppRoutes.getNotificationsURL, {
                search: params
            })
                .map(function (res) { return res.json(); });
        }
    };
    TenantService.prototype.updateTenantProfile = function (token, tenant) {
        if (token) {
            var headers = new http_2.Headers();
            headers.append('Content-Type', 'application/json');
            var userDesiredArea = tenant.userDesiredArea;
            var userDesiredCity = tenant.userDesiredCity;
            var userPhoneNo = tenant.userPhoneNo;
            var userRequirementDescription = tenant.userRequirementDescription;
            var userCurrentArea = tenant.userCurrentArea;
            console.log("updating:" + userDesiredArea + userDesiredCity +
                userPhoneNo + userRequirementDescription + userCurrentArea);
            var json = JSON.stringify({ token: token, userDesiredArea: userDesiredArea, userDesiredCity: userDesiredCity,
                userPhoneNo: userPhoneNo, userRequirementDescription: userRequirementDescription, userCurrentArea: userCurrentArea });
            return this.http.put(app_routes_1.AppRoutes.updateUserProfileURL, json, { headers: headers })
                .map(function (res) { return res.json(); });
        }
    };
    //takes user token and notification id to approve a particular notification
    TenantService.prototype.approveNotification = function (token, notification) {
        console.log(" notf id:" + notification);
        var headers = new http_2.Headers();
        headers.append('Content-Type', 'application/json');
        var json = JSON.stringify({ token: token, notification: notification });
        return this.http.put(app_routes_1.AppRoutes.approveNotification, json, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    TenantService.prototype.changePassword = function (token, cur_password, new_password) {
        console.log(" current password: " + cur_password);
        console.log(" new password: " + new_password);
        var headers = new http_2.Headers();
        headers.append('Content-Type', 'application/json');
        var json = JSON.stringify({ token: token, cur_password: cur_password, new_password: new_password });
        /*let params: URLSearchParams = new URLSearchParams();
            params.set("token", token);
            params.set("password", cur_password);*/
        return this.http.put(app_routes_1.AppRoutes.changePassword, json, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    TenantService.prototype.uploadImage = function (token, photo) {
        console.log("photo:" + photo.name);
        console.log("token:" + token);
        var headers = new http_2.Headers();
        headers.append("Authorization", token);
        //headers.append('Content-Type','multipart/form-data');
        var options = new http_1.RequestOptions({ headers: headers });
        var formData = new FormData();
        formData.append('token', token); //use same keys on server side to extract values
        formData.append('photo', photo);
        //var json = JSON.stringify({token, photo});
        /* let params: URLSearchParams = new URLSearchParams();
             params.set("token", token);
             params.set("password", photo);
             return this.http.put(AppRoutes.deleteAccountURL, json,{headers: headers})
                 .map((res)=> res.json());*/
        return this.http.post(app_routes_1.AppRoutes.uploadImageURL, formData, options)
            .map(function (res) { return res.json().error; });
    };
    TenantService.prototype.deleteAccount = function (token, password) {
        var headers = new http_2.Headers();
        headers.append('Content-Type', 'application/json');
        var json = JSON.stringify({ token: token, password: password });
        var params = new http_1.URLSearchParams();
        params.set("token", token);
        params.set("password", password);
        return this.http.put(app_routes_1.AppRoutes.deleteAccountURL, json, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    return TenantService;
}());
TenantService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], TenantService);
exports.TenantService = TenantService;
//# sourceMappingURL=tenantHome.services.js.map