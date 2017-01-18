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
var InviteTenantService = (function () {
    function InviteTenantService(http) {
        this.http = http;
        this.inviteURL = "http://localhost:3005/inviteTenant";
    }
    InviteTenantService.prototype.inviteTenant = function (tenantEmail, landlordFullName, landlordEmail, landlordPhoneNo, landlordMessage) {
        console.log(landlordFullName + " (" + landlordEmail + "," + landlordPhoneNo + ")"
            + " is inviting " + tenantEmail);
        var headers = new http_2.Headers();
        headers.append('Content-Type', 'application/json');
        var json = JSON.stringify({ tenantEmail: tenantEmail, landlordFullName: landlordFullName, landlordEmail: landlordEmail,
            landlordPhoneNo: landlordPhoneNo, landlordMessage: landlordMessage });
        return this.http.put(this.inviteURL, json, { headers: headers })
            .map(function (res) { return res.json().error; });
        //.subscribe(result=> this.callback(result));
    };
    // handle Response from login URL
    InviteTenantService.prototype.callback = function (item) {
        console.log("hi: " + item);
    };
    InviteTenantService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    return InviteTenantService;
}());
InviteTenantService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], InviteTenantService);
exports.InviteTenantService = InviteTenantService;
//# sourceMappingURL=inviteTenant.services.js.map