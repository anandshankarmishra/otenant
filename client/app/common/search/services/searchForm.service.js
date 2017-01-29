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
var app_routes_1 = require("../../../app-routes");
var SearchFormService = (function () {
    function SearchFormService(http) {
        this.http = http;
    }
    SearchFormService.prototype.searchTenants = function (desired_city, desired_areas, types_of_tenant, indx, limt) {
        var headers = new http_2.Headers();
        headers.append('Content-Type', 'application/json');
        var json = JSON.stringify({ desired_city: desired_city, desired_areas: desired_areas, types_of_tenant: types_of_tenant });
        var params = new http_1.URLSearchParams();
        params.set("desired_city", desired_city);
        params.set("desired_areas", desired_areas);
        params.set("types_of_tenant", types_of_tenant);
        params.set("index", indx);
        params.set("limit", limt);
        var options = new http_1.RequestOptions({ headers: headers,
            search: params });
        return this.http.get(app_routes_1.AppRoutes.searchTenantsURL, options)
            .map(function (res) { return res.json(); });
    };
    return SearchFormService;
}());
SearchFormService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], SearchFormService);
exports.SearchFormService = SearchFormService;
//# sourceMappingURL=searchForm.service.js.map