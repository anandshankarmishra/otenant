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
var router_1 = require("@angular/router");
var HomePageComponent = (function () {
    function HomePageComponent(router) {
        this.router = router;
        this.errorCityEmpty = "The city field can not be empty, please supply a value.";
        this.errorMsg = "";
        this.typesOfTenant = [];
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
            checkAll: 'Check all. ',
            uncheckAll: 'Uncheck all',
            checked: 'checked',
            checkedPlural: 'checked',
            searchPlaceholder: 'Search...',
            defaultTitle: 'SELECT OF TENANTS'
        };
        this.searchTenantsURL = './searchTenants';
        this.numOfTenantsToShow = 20; // number of tenants to show on page at any given time
        this.index = 0; //on every scroll, index will be set to fetch next numOfTenantsToShow Tenants
    }
    HomePageComponent.prototype.ngOnInit = function () {
    };
    HomePageComponent.prototype.searchTenants = function (searchCity, searchAreas, typesOfTenant) {
        console.log(searchCity);
        console.log(searchAreas);
        console.log(typesOfTenant);
        this.searchCity = searchCity;
        this.searchAreas = searchAreas;
        this.typesOfTenant = typesOfTenant;
        this.index = 0; //show results from top
        if (searchCity == "") {
            this.errorMsg = this.errorCityEmpty;
            return;
        }
        this.router.navigate([this.searchTenantsURL], { queryParams: { desired_city: this.searchCity,
                desired_areas: this.searchAreas,
                types_of_tenant: this.typesOfTenant,
                index: this.index,
                limit: this.numOfTenantsToShow } });
    };
    HomePageComponent.prototype.onChange = function (event) {
        console.log("got following from search form");
        console.log(event);
    };
    return HomePageComponent;
}());
HomePageComponent = __decorate([
    core_1.Component({
        selector: 'homepage',
        moduleId: module.id,
        templateUrl: '../homepage.html',
        styleUrls: ['../homepage.css']
    }),
    __metadata("design:paramtypes", [router_1.Router])
], HomePageComponent);
exports.HomePageComponent = HomePageComponent;
//# sourceMappingURL=homepage.component.js.map