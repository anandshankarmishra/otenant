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
var login_service_1 = require("../../../login/services/login.service");
var tenantHome_services_1 = require("../../../tenantHome/services/tenantHome.services");
var UploadImageComponent = (function () {
    function UploadImageComponent(loginService, TenantService) {
        this.loginService = loginService;
        this.TenantService = TenantService;
        this.uploadImg = false;
        this.errorMsg = '';
        this.failedMsg = 'Failed to load image. Try again!';
    }
    UploadImageComponent.prototype.upload = function () {
        var _this = this;
        console.log("uploading..");
        var token = this.loginService.getToken();
        if (token && this.imgFile) {
            this.TenantService.uploadImage(token, this.imgFile).
                subscribe(function (data) {
                console.log("data:" + data.error); //successful
                _this.uploadImg = false;
            }, function (error) {
                console.log(" error:" + JSON.stringify(error));
            });
        }
        else {
            this.errorMsg = this.failedMsg;
        }
    };
    UploadImageComponent.prototype.imageUploaded = function ($event) {
        this.imgFile = $event.file;
        console.log("event:" + this.imgFile.name);
    };
    return UploadImageComponent;
}());
UploadImageComponent = __decorate([
    core_1.Component({
        selector: 'uploadImage',
        moduleId: module.id,
        templateUrl: '../uploadImage.html',
        styleUrls: ['../uploadImage.css']
    }),
    __metadata("design:paramtypes", [login_service_1.LoginService,
        tenantHome_services_1.TenantService])
], UploadImageComponent);
exports.UploadImageComponent = UploadImageComponent;
//# sourceMappingURL=uploadImage.component.js.map