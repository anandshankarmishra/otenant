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
var HomePageComponent = (function () {
    function HomePageComponent(formBuilder, router) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.showDialog = false;
        this.showLoginDialog = false;
        this.searchTenantsURL = './searchTenants';
        //Build search form with validators
        this.searchForm = this.formBuilder.group({
            'searchCity': ['', forms_1.Validators.required],
            'searchArea': ['', [forms_1.Validators.required]],
            'search_type_of_tenant': ['', forms_1.Validators.required]
        });
    }
    HomePageComponent.prototype.ngOnInit = function () {
    };
    HomePageComponent.prototype.searchTenants = function () {
        if (this.searchForm.dirty && this.searchForm.valid) {
            this.router.navigate([this.searchTenantsURL], { queryParams: { city: this.searchForm.value.searchCity,
                    area: this.searchForm.value.searchArea,
                    tenantType: this.searchForm.value.search_type_of_tenant } });
        }
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
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        router_1.Router])
], HomePageComponent);
exports.HomePageComponent = HomePageComponent;
//# sourceMappingURL=homepage.component.js.map