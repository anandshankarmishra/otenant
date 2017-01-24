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
var http_1 = require("@angular/http");
var http_2 = require("@angular/http");
var router_1 = require("@angular/router");
require("rxjs/add/operator/toPromise");
require("rxjs/add/operator/map");
var LoginService = (function () {
    function LoginService(http, router) {
        this.http = http;
        this.router = router;
        this.loginURL = "http://192.168.0.5:3005/login";
        this.isAuthenticated = false;
        this.tokn = "auth_key";
    }
    LoginService.prototype.isloggedIn = function () {
        var token = window.localStorage.getItem(this.tokn);
        if (token) {
            console.log(" already logged in");
            return true;
        }
        return false;
    };
    LoginService.prototype.getToken = function () {
        return window.localStorage.getItem(this.tokn);
    };
    //Login a user with email and password
    LoginService.prototype.login = function (username, password) {
        var _this = this;
        var headers = new http_2.Headers();
        headers.append('Content-Type', 'application/json');
        //headers.append('Access-Control-Allow-Origin','*');
        //headers.append('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
        console.log("here:" + username + password);
        var json = JSON.stringify({ username: username, password: password });
        return new Promise(function (resolve) {
            _this.http.post(_this.loginURL, json, { headers: headers })
                .subscribe(function (data) {
                if (data.status == 200) {
                    console.log("setting auth_key");
                    window.localStorage.setItem(_this.tokn, data.json().token);
                    _this.isAuthenticated = true;
                }
                resolve(_this.isAuthenticated);
            }, function (err) {
                console.log("error:" + err);
                if (err.status == 401) {
                    console.log("invalid user");
                }
                resolve(_this.isAuthenticated);
            });
        });
        /* return this.http.post(this.loginURL,json,{headers: headers})
                  .subscribe(result => this.callback(result)
                  , err=> (this.onError(err))
                  )*/
        //.map((res)=> this.extractData(res)
        //      )
        //  .subscribe(result=> this.callback(result));
    };
    LoginService.prototype.onError = function (res) {
        console.log("error mila");
        return JSON.stringify(res.status);
    };
    // Logout the user
    LoginService.prototype.logout = function () {
        // To log out, just remove the token and profile
        // from local storage
        //localStorage.removeItem('profile');
        localStorage.removeItem(this.tokn);
        // Send the user back to the public deals page after logout
        this.router.navigateByUrl('');
    };
    // handle Response from login URL
    LoginService.prototype.callback = function (item) {
        if (item.status == 200) {
            console.log("in callback, token:" + item.json().token);
            localStorage.setItem(this.tokn, item.json().token);
            this.isAuthenticated = true;
        }
        if (item.status == 401) {
            console.log(" user not foundaaa");
        }
        console.log("hi: " + item);
    };
    LoginService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    return LoginService;
}());
LoginService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, router_1.Router])
], LoginService);
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map