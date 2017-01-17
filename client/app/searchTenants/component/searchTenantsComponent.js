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
var router_1 = require("@angular/router");
var searchTenants_services_1 = require("../services/searchTenants.services");
var SearchTenantsComponent = (function () {
    function SearchTenantsComponent(searchTenantservice, route, formBuilder, router) {
        this.searchTenantservice = searchTenantservice;
        this.route = route;
        this.formBuilder = formBuilder;
        this.router = router;
        this.showDialog = false;
        this.tenant_email = '';
        this.tenants = [];
        this.searchTenantsURL = './searchTenants';
        //Duplicat code from homepage Component, need to refactor later
        this.searchForm = this.formBuilder.group({
            'searchCity': ['', forms_1.Validators.required],
            'searchArea': ['', forms_1.Validators.required],
            'search_type_of_tenant': ['', forms_1.Validators.required]
        });
    }
    SearchTenantsComponent.prototype.ngOnInit = function () {
        var desired_city = this.route.snapshot.queryParams["city"];
        console.log(" city: " + desired_city);
        var desired_area = this.route.snapshot.queryParams["area"];
        console.log(" city: " + desired_area);
        var type_of_tenant = this.route.snapshot.queryParams["tenantType"];
        console.log(" city: " + type_of_tenant);
        this.getTenants(desired_city, desired_area, type_of_tenant);
    }; // end of ngOnInit
    SearchTenantsComponent.prototype.getTenants = function (desired_city, desired_area, type_of_tenant) {
        var _this = this;
        this.searchTenantservice.searchTenants(desired_city, desired_area, type_of_tenant)
            .subscribe(function (result) { return _this.tenants = (result); });
    };
    //duplicate code from homepage component, refactor later
    SearchTenantsComponent.prototype.searchTenants = function () {
        if (this.searchForm.dirty && this.searchForm.valid) {
            this.router.navigate([this.searchTenantsURL], { queryParams: { city: this.searchForm.value.searchCity,
                    area: this.searchForm.value.searchArea,
                    tenantType: this.searchForm.value.search_type_of_tenant } });
            this.getTenants(this.searchForm.value.searchCity, this.searchForm.value.searchArea, this.searchForm.value.search_type_of_tenant);
        }
    };
    SearchTenantsComponent.prototype.onClick = function (tenant) {
        console.log("onClick:" + tenant.userEmail);
        this.showDialog = !this.showDialog;
        this.tenant_email = tenant.userEmail;
    };
    return SearchTenantsComponent;
}());
SearchTenantsComponent = __decorate([
    core_1.Component({
        selector: 'searchTenants-view',
        moduleId: module.id,
        templateUrl: '../searchTenants.html',
        styleUrls: ['../searchTenants.css']
    }),
    __metadata("design:paramtypes", [searchTenants_services_1.SearchTenantsService,
        router_1.ActivatedRoute,
        forms_1.FormBuilder,
        router_1.Router])
], SearchTenantsComponent);
exports.SearchTenantsComponent = SearchTenantsComponent;
//# sourceMappingURL=searchTenantsComponent.js.map