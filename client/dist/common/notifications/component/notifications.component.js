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
var http_1 = require("@angular/http");
var NotificationComponent = (function () {
    function NotificationComponent(loginService, tenantService, http) {
        this.loginService = loginService;
        this.tenantService = tenantService;
        this.http = http;
        this.closable = true;
        this.notifs = []; //get notifications in this array
        this.visibleChange = new core_1.EventEmitter();
        this.myTokn = ""; //get tenant profile
        this.approved = false; //disable approve button once notif is approved
        this.isDisabled = false;
        this.disabled = "";
        this.myTokn = loginService.getToken();
        console.log("notifTokn:" + this.myTokn);
    }
    NotificationComponent.prototype.ngOnInit = function () {
        //this.getNotifications(this.myTokn);
    };
    NotificationComponent.prototype.close = function () {
        this.visible = false;
        this.visibleChange.emit(this.visible);
    };
    NotificationComponent.prototype.getNotifications = function (token) {
        var _this = this;
        this.tenantService.getNotifications(token)
            .subscribe(function (data) { return _this.notifs = data; });
    };
    NotificationComponent.prototype.approve = function (notf) {
        var _this = this;
        this.tenantService.approveNotification(this.myTokn, notf)
            .subscribe(function (data) {
            console.log("error:" + data.error);
            if (data.error == false)
                _this.approved = true;
            //this.disableButton();
        });
    };
    NotificationComponent.prototype.disableButton = function (notf) {
        if (this.approved = true) 
        //this.isDisabled = true;
        {
            {
                document.getElementById(notf._id).style.visibility = "hidden";
            }
        }
    };
    return NotificationComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NotificationComponent.prototype, "closable", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], NotificationComponent.prototype, "visible", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], NotificationComponent.prototype, "notifs", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], NotificationComponent.prototype, "visibleChange", void 0);
NotificationComponent = __decorate([
    core_1.Component({
        selector: 'notif-dialog',
        moduleId: module.id,
        templateUrl: '../notif.html',
        styleUrls: ['../notif.css'],
        animations: [
            core_1.trigger('dialog', [
                core_1.transition('void => *', [
                    core_1.style({ transform: 'scale3d(.3, .3, .3)' }),
                    core_1.animate(100)
                ]),
                core_1.transition('* => void', [
                    core_1.animate(100, core_1.style({ transform: 'scale3d(.0, .0, .0)' }))
                ])
            ])
        ]
    }),
    __metadata("design:paramtypes", [login_service_1.LoginService,
        tenantHome_services_1.TenantService,
        http_1.Http])
], NotificationComponent);
exports.NotificationComponent = NotificationComponent;
//# sourceMappingURL=notifications.component.js.map