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
var searchForm_service_1 = require("../services/searchForm.service");
var SearchFormComponent = (function () {
    function SearchFormComponent(searchFormService, route, router) {
        this.searchFormService = searchFormService;
        this.route = route;
        this.router = router;
        this.myOptions = [
            { id: 'GOG', name: 'GROUP OF GIRLS' },
            { id: 'BB', name: 'BACHELOR BOY' },
            { id: 'FAM', name: 'FAMILY' },
            { id: 'BG', name: 'BACHELOR GIRL' },
            { id: 'GOB', name: 'GROUP OF BOYS' },
            { id: 'UC', name: 'UNMARRIED COUPLE' },
            { id: 'OTH', name: 'OTHERS' }
        ];
        this.mySettings = {
            pullRight: false,
            enableSearch: false,
            checkedStyle: 'checkboxes',
            buttonClasses: 'btn btn-default',
            selectionLimit: 0,
            closeOnSelect: false,
            showCheckAll: true,
            showUncheckAll: true,
            dynamicTitleMaxItems: 0,
            maxHeight: '300px',
        };
        this.myTexts = {
            checkAll: 'Check all',
            uncheckAll: 'Uncheck all',
            checked: 'checked',
            checkedPlural: 'checked',
            searchPlaceholder: 'Search...',
            defaultTitle: 'Select',
        };
        this.showDialog = false;
        this.tenant_email = '';
        this.tenantsSearched = new core_1.EventEmitter();
        this.resetTenantsArray = new core_1.EventEmitter();
        this.tenants = [];
        this.dontSearchFurther = false;
        this.numOfTenantsToShow = 20; // number of tenants to show on page at any given time
        this.index = 0; //on every scroll, index will be set to fetch next numOfTenantsToShow Tenants
    }
    SearchFormComponent.prototype.getTenants = function (desired_city, desired_area, type_of_tenant, indx, limt) {
        var _this = this;
        this.searchFormService.searchTenants(desired_city, desired_area, type_of_tenant, indx, limt)
            .subscribe(function (result) {
            if (result.length % 20 != 0) {
                _this.tenantsSearched.emit(result);
                _this.dontSearchFurther = true;
                return;
            }
            else {
                _this.tenantsSearched.emit(result);
                console.log("index:" + _this.index);
            }
        });
    };
    SearchFormComponent.prototype.searchTenants = function (searchCity, searchAreas, typesOfTenant) {
        console.log(searchCity);
        console.log(searchAreas);
        console.log(typesOfTenant);
        this.searchCity = searchCity;
        this.searchAreas = searchAreas;
        this.typesOfTenant = typesOfTenant;
        this.index = 0; //show results from top
        this.dontSearchFurther = false;
        this.resetTenantsArray.emit(true);
        this.getTenants(searchCity, searchAreas, typesOfTenant, this.index, this.numOfTenantsToShow);
    };
    SearchFormComponent.prototype.handlePageScrollEvent = function (event) {
        console.log("From searchForm Component:");
        this.index = this.index + this.numOfTenantsToShow;
        this.getTenants(this.searchCity, this.searchAreas, this.typesOfTenant, this.index, this.numOfTenantsToShow);
    };
    SearchFormComponent.prototype.onChange = function (event) {
        console.log(event);
    };
    return SearchFormComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], SearchFormComponent.prototype, "tenantsSearched", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], SearchFormComponent.prototype, "resetTenantsArray", void 0);
SearchFormComponent = __decorate([
    core_1.Component({
        selector: 'searchForm-view',
        moduleId: module.id,
        templateUrl: '../searchForm.html',
        styleUrls: ['../searchForm.css']
    }),
    __metadata("design:paramtypes", [searchForm_service_1.SearchFormService,
        router_1.ActivatedRoute,
        router_1.Router])
], SearchFormComponent);
exports.SearchFormComponent = SearchFormComponent;
//# sourceMappingURL=searchFormComponent.js.map