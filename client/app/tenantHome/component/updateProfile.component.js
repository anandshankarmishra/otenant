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
var tenant_1 = require("../../models/tenant");
var login_service_1 = require("../../login/services/login.service");
var tenantHome_services_1 = require("../../tenantHome/services/tenantHome.services");
var validation_service_1 = require("../../common/validation/services/validation.service");
var UpdateProfileComponent = (function () {
    function UpdateProfileComponent(loginServicee, tenantService) {
        this.loginServicee = loginServicee;
        this.tenantService = tenantService;
        this.tenant = new tenant_1.Tenant();
        this.editUser = false;
        //private zone:NgZone) {
        this.myTokn = loginServicee.getToken();
    }
    UpdateProfileComponent.prototype.ngOnInit = function () {
        this.getProfile(this.myTokn);
        //Build the Update Profile Form
        var formB = new forms_1.FormBuilder();
        this.updateProfileForm = formB.group({
            'userCurrentArea': [''],
            'userPhoneNo': ['',
                [validation_service_1.ValidationService.phoneNumValidator]],
            'userDesiredCity': [''],
            'userDesiredArea': [''],
            'userRequirementDescription': ['']
        });
    };
    UpdateProfileComponent.prototype.getProfile = function (token) {
        var _this = this;
        this.tenantService.getTenantProfile(token)
            .subscribe(function (data) {
            _this.tenant = (data);
            _this.editUser = false;
        }, function (error) {
            console.log("Error" + JSON.stringify(error));
        });
    };
    //show the editable textboxes 
    UpdateProfileComponent.prototype.showEditUser = function () {
        this.editUser = !this.editUser;
    };
    UpdateProfileComponent.prototype.updateProfile = function () {
        var _this = this;
        var tenant = new tenant_1.Tenant();
        tenant.userCurrentArea = this.updateProfileForm.value.userCurrentArea;
        tenant.userDesiredCity = this.updateProfileForm.value.userDesiredCity;
        tenant.userDesiredArea = this.updateProfileForm.value.userDesiredArea;
        tenant.userPhoneNo = this.updateProfileForm.value.userPhoneNo;
        tenant.userRequirementDescription = this.updateProfileForm.value.userRequirementDescription;
        this.tenantService.updateTenantProfile(this.myTokn, tenant).
            subscribe(function (data) {
            // this.zone.run(()=> { //to implement individual component reload inside a page
            _this.tenant = data;
            console.log("reloaded UpdateProfileComponent");
            console.log(_this.tenant.userPhoneNo);
            // })
        }, function (err) {
            console.log("error:" + JSON.stringify(err));
        });
    };
    return UpdateProfileComponent;
}());
UpdateProfileComponent = __decorate([
    core_1.Component({
        selector: 'updateProfile-view',
        moduleId: module.id,
        templateUrl: '../updateProfile.html'
    }),
    __metadata("design:paramtypes", [login_service_1.LoginService,
        tenantHome_services_1.TenantService])
], UpdateProfileComponent);
exports.UpdateProfileComponent = UpdateProfileComponent;
//# sourceMappingURL=updateProfile.component.js.map