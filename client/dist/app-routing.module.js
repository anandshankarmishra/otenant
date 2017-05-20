"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var homepage_component_1 = require("./homepage/component/homepage.component");
var searchTenantsComponent_1 = require("./searchTenants/component/searchTenantsComponent");
var tenantHome_component_1 = require("./tenantHome/component/tenantHome.component");
var deleteAccount_component_1 = require("./tenantHome/component/deleteAccount.component");
var authguard_services_1 = require("./common/auth guard/authguard.services");
//import { HeroDetailComponent }  from './hero-detail.component';
var routes = [
    //{ path: 'test', component: TestComponent },
    { path: '', component: homepage_component_1.HomePageComponent },
    { path: 'home', component: tenantHome_component_1.TenantHomeComponent,
        canActivate: [authguard_services_1.AuthGuard] },
    { path: 'searchTenants', component: searchTenantsComponent_1.SearchTenantsComponent },
    { path: 'deleteAccount', component: deleteAccount_component_1.DeleteAccountComponent },
    { path: '**', component: homepage_component_1.HomePageComponent }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(routes)],
        exports: [router_1.RouterModule]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map