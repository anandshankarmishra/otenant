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
var platform_browser_1 = require("@angular/platform-browser");
var TestComponent = (function () {
    function TestComponent() {
        this.searchedTenants = [];
    }
    TestComponent.prototype.ngOnInit = function () { };
    TestComponent.prototype.handleSearchedTenants = function (tenants) {
        var _this = this;
        if (this.searchedTenants.length == 0) {
            this.searchedTenants = tenants;
        }
        else {
            console.log("here in laundap:");
            tenants.map(function (te) { return _this.searchedTenants.push(te); });
        }
        //console.log(tenants);
        //event.map(t => console.log(t.userFullName));
    };
    TestComponent.prototype.handleResetTenantsArray = function (event) {
        if (event == true) {
            console.log("reset:" + event);
            this.searchedTenants = [];
        }
    };
    return TestComponent;
}());
TestComponent = __decorate([
    core_1.Component({
        selector: 'test-view',
        moduleId: module.id,
        templateUrl: '../test.html',
        styleUrls: ['../test.css']
    })
], TestComponent);
exports.TestComponent = TestComponent;
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
//# sourceMappingURL=test.component.js.map