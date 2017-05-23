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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var searchTenants_services_1 = require("../services/searchTenants.services");
var platform_browser_1 = require("@angular/platform-browser");
var SearchTenantsComponent = (function () {
    function SearchTenantsComponent(searchTenantsService, route) {
        this.searchTenantsService = searchTenantsService;
        this.route = route;
        this.showDialog = false;
        this.tenant_email = '';
        this.errorCityEmpty = "The city field can not be empty, please supply a value.";
        this.errorMsg = "";
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
            defaultTitle: 'SELECT TYPE OF TENANTS',
        };
        this.searchedTenants = [];
        //tenant_email:string ='';    
        this.dontSearchFurther = false;
        this.numOfTenantsToShow = 20; // number of tenants to show on page at any given time
        this.index = 0; //on every scroll, index will be set to fetch next numOfTenantsToShow Tenants
    }
    SearchTenantsComponent.prototype.ngOnInit = function () {
        console.log("cameFromHomePage ngoninit:");
        var desired_city = this.route.snapshot.queryParams["desired_city"];
        var desired_area = this.route.snapshot.queryParams["desired_areas"];
        var types_of_tenant = this.route.snapshot.queryParams["types_of_tenant"];
        var index = this.route.snapshot.queryParams["index"];
        var limit = this.route.snapshot.queryParams["limit"];
        //populate these values in form ... write code
        this.searchCity = desired_city;
        this.searchAreas = desired_area;
        if (types_of_tenant != undefined && types_of_tenant != null)
            this.selectedOptions = types_of_tenant.split(',');
        //call search function if at least a single parameter is provided
        if (desired_city != undefined || desired_area != undefined || types_of_tenant != undefined) {
            this.getTenants(desired_city, desired_area, types_of_tenant, index, limit);
        }
        //track scroll
    }; // end of ngOnInit
    SearchTenantsComponent.prototype.getTenants = function (desired_city, desired_area, type_of_tenant, indx, limt) {
        var _this = this;
        console.log("here in gettenants of seachTenantComponent");
        this.searchTenantsService.searchTenants(desired_city, desired_area, type_of_tenant, indx, limt)
            .subscribe(function (result) {
            console.log("result length:" + result.length);
            if (result.length % 20 != 0) {
                console.log("from %20 wala if");
                console.log(result);
                result.map(function (te) { return _this.searchedTenants.push(te); });
                _this.dontSearchFurther = true;
                return;
            }
            else {
                console.log("from %20 wala else");
                result.map(function (te) { return _this.searchedTenants.push(te); });
                console.log("index:" + _this.index);
            }
        });
    };
    SearchTenantsComponent.prototype.onClickResetAndSearch = function (desired_city, desired_area, type_of_tenant) {
        //reset Array
        this.searchedTenants = [];
        this.index = 0;
        this.getTenants(desired_city, desired_area, type_of_tenant, this.index, this.numOfTenantsToShow);
    };
    SearchTenantsComponent.prototype.handlePageScrollEvent = function (event) {
        console.log("handle scroll:");
        this.index = this.index + this.numOfTenantsToShow;
        this.getTenants(this.searchCity, this.searchAreas, this.typesOfTenant, this.index, this.numOfTenantsToShow);
    };
    SearchTenantsComponent.prototype.onChange = function (event) {
        console.log("got following from search form");
        console.log(event);
    };
    SearchTenantsComponent.prototype.onClickInvite = function (tenant) {
        console.log("onClickInvite:" + tenant.userEmail);
        this.tenant_email = tenant.userEmail;
    };
    return SearchTenantsComponent;
}());
SearchTenantsComponent = __decorate([
    core_1.Component({
        selector: 'searchTenants-view',
        moduleId: module.id,
        templateUrl: '../searchTenants.html',
        styleUrls: ['../style-tenant-home.css', '../searchTenants.css']
    }),
    __metadata("design:paramtypes", [searchTenants_services_1.SearchTenantsService,
        router_1.ActivatedRoute])
], SearchTenantsComponent);
exports.SearchTenantsComponent = SearchTenantsComponent;
var TrackScrollComponent = (function () {
    function TrackScrollComponent(document) {
        this.document = document;
        this.pageScrolled = new core_1.EventEmitter();
    }
    TrackScrollComponent.prototype.track = function (event) {
        var windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        var body = document.body, html = document.documentElement;
        var docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        var windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight) {
            if (this.dontEmit == true) {
                console.log("dontEmit:" + this.dontEmit);
                return;
            }
            console.log('valid event');
            this.pageScrolled.emit();
        }
    };
    return TrackScrollComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], TrackScrollComponent.prototype, "dontEmit", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], TrackScrollComponent.prototype, "pageScrolled", void 0);
__decorate([
    core_1.HostListener('window:scroll', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TrackScrollComponent.prototype, "track", null);
TrackScrollComponent = __decorate([
    core_1.Component({
        selector: 'track-scroll',
        template: ''
    }),
    __param(0, core_1.Inject(platform_browser_1.DOCUMENT)),
    __metadata("design:paramtypes", [Document])
], TrackScrollComponent);
exports.TrackScrollComponent = TrackScrollComponent;
//# sourceMappingURL=searchTenantsComponent.js.map