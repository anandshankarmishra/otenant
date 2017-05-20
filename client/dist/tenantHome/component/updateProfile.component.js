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
        console.log("I am inside the constructor of updateProfileComponent");
        this.myTokn = loginServicee.getToken();
    }
    UpdateProfileComponent.prototype.ngOnInit = function () {
        // this.getProfile(this.myTokn);
        //Build the Update Profile Form
        console.log("Ng on init Tenant" + JSON.stringify(this.tenant));
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
    //  getProfile(token) {
    //     this.tenantService.getTenantProfile(token)
    //     .subscribe((data) => {
    //         this.tenant = (data);
    //         this.editUser = false;
    //     }, 
    //     (error) => {
    //         console.log("Error" + JSON.stringify(error));
    //     }
    //     );
    // }
    //show the editable textboxes 
    UpdateProfileComponent.prototype.showEditUser = function () {
        this.editUser = !this.editUser;
    };
    UpdateProfileComponent.prototype.updateProfile = function () {
        var _this = this;
        if (this.updateProfileForm.dirty) {
            console.log("updating profile:");
            console.log(this.updateProfileForm);
            var tenant = new tenant_1.Tenant();
            //if conditions have been put to fix a bug, the non dirty values were always empty why ?
            if (this.updateProfileForm.controls.userCurrentArea.dirty)
                tenant.userCurrentArea = this.updateProfileForm.controls.userCurrentArea.value;
            if (this.updateProfileForm.controls.userDesiredCity.dirty)
                tenant.userDesiredCity = this.updateProfileForm.value.userDesiredCity;
            if (this.updateProfileForm.controls.userDesiredArea.dirty)
                tenant.userDesiredArea = this.updateProfileForm.value.userDesiredArea;
            if (this.updateProfileForm.controls.userPhoneNo.dirty)
                tenant.userPhoneNo = this.updateProfileForm.value.userPhoneNo;
            if (this.updateProfileForm.controls.userRequirementDescription.dirty)
                tenant.userRequirementDescription = this.updateProfileForm.value.userRequirementDescription;
            console.log("Printing Tenant:" + JSON.stringify(tenant));
            this.tenantService.updateTenantProfile(this.myTokn, tenant).
                subscribe(function (data) {
                // this.zone.run(()=> { //to implement individual component reload inside a page
                _this.tenant = data;
                console.log(_this.tenant.userPhoneNo);
                // })
            }, function (err) {
                console.log("error:" + JSON.stringify(err));
            });
        }
    };
    return UpdateProfileComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], UpdateProfileComponent.prototype, "tenant", void 0);
UpdateProfileComponent = __decorate([
    core_1.Component({
        selector: 'updateProfile-view',
        moduleId: module.id,
        templateUrl: '../updateProfile.html'
        //styleUrls:['../tenantHome.css']
    }),
    __metadata("design:paramtypes", [login_service_1.LoginService,
        tenantHome_services_1.TenantService])
], UpdateProfileComponent);
exports.UpdateProfileComponent = UpdateProfileComponent;
//# sourceMappingURL=updateProfile.component.js.map