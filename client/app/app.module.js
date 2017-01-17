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
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
//component imports
var app_component_1 = require("./app.component");
var homepage_component_1 = require("./homepage/component/homepage.component");
var signup_component_1 = require("./signup/component/signup.component");
var control_messages_component_1 = require("./signup/component/control-messages.component");
var login_component_1 = require("./login/component/login.component");
var searchTenantsComponent_1 = require("./searchTenants/component/searchTenantsComponent");
var searchFormComponent_1 = require("./common/search/component/searchFormComponent");
var inviteTenant_component_1 = require("./inviteTenant/component/inviteTenant.component");
var tenantHome_component_1 = require("./tenantHome/component/tenantHome.component");
//import { SearchTenantsComponent } from './searchTenants/component/searchTenants.component';
//service imports
var login_service_1 = require("./login/services/login.service");
var signup_service_1 = require("./signup/services/signup.service");
var validation_service_1 = require("./signup/services/validation.service");
var searchTenants_services_1 = require("./searchTenants/services/searchTenants.services");
var inviteTenant_services_1 = require("./inviteTenant/services/inviteTenant.services");
var app_routing_module_1 = require("./app-routing.module");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            http_1.HttpModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            app_routing_module_1.AppRoutingModule
        ],
        declarations: [
            app_component_1.AppComponent,
            homepage_component_1.HomePageComponent,
            signup_component_1.SignUpComponent,
            login_component_1.LoginComponent,
            control_messages_component_1.ControlMessagesComponent,
            searchTenantsComponent_1.SearchTenantsComponent,
            searchFormComponent_1.SearchFormComponent,
            inviteTenant_component_1.InviteTenantComponent,
            tenantHome_component_1.TenantHomeComponent
        ],
        providers: [
            signup_service_1.SignUpService,
            login_service_1.LoginService,
            validation_service_1.ValidationService,
            searchTenants_services_1.SearchTenantsService,
            inviteTenant_services_1.InviteTenantService
        ],
        bootstrap: [app_component_1.AppComponent]
    }),
    __metadata("design:paramtypes", [])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map