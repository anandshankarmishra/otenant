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
var SearchTenantsService = (function () {
    //  tenant: Tenant;
    function SearchTenantsService(http) {
        this.http = http;
    }
    SearchTenantsService.prototype.searchTenants = function (desired_city, desired_areas, types_of_tenant) {
        // console.log ("got param:" + desired_city + ", " + desired_areas + ", "  + types_of_tenant)
        var headers = new http_2.Headers();
        headers.append('Content-Type', 'application/json');
        var json = JSON.stringify({ desired_city: desired_city, desired_areas: desired_areas, types_of_tenant: types_of_tenant });
        /*this.http.post(this.searchURL,json,{headers: headers})
            .map(res=> res.json().error)
            .subscribe(result=> this.callback(result));*/
        var params = new http_1.URLSearchParams();
        params.set("desired_city", desired_city);
        params.set("desired_areas", desired_areas);
        params.set("types_of_tenant", types_of_tenant);
        var options = new http_1.RequestOptions({ headers: headers,
            search: params });
        return this.http.get(app_routes_1.AppRoutes.searchTenantsURL, options)
            .map(function (res) { return res.json(); });
        //.subscribe(result=> this.callback(result));
        //return this.tenants;
    };
    // handle Response from login URL
    SearchTenantsService.prototype.callback = function (item) {
        //console.log("hi: " + JSON.stringify(item));
        //console.log("hikk: " + item[0]['_id']);
        for (var i in item) {
            // this.tenants[i].id = (JSON.stringify(item[i]['_id']));
            /*console.log ("User id:" + JSON.stringify(item[i]['_id']));
            console.log ("User tenant type:" + JSON.stringify(item[i]['userTypeOfTenant']));
            console.log ("User Desired city:" + JSON.stringify(item[i]['userDesiredCity']));*/
            ///console.log ("User name: " + JSON.stringify(item[i]['userFullName']))
            var id = item[i]['_id'];
            console.log("id: " + id);
            var name_1 = item[i]['userFullName'];
            console.log("name: " + name_1);
        }
        //return this.tenants;
    };
    SearchTenantsService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    return SearchTenantsService;
}());
SearchTenantsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], SearchTenantsService);
exports.SearchTenantsService = SearchTenantsService;
//# sourceMappingURL=searchTenants.services.js.map