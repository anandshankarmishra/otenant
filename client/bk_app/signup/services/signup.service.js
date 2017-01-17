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
//import { Observable } from 'rxjs';
require("rxjs/add/operator/toPromise");
require("rxjs/add/operator/map");
var SignUpService = (function () {
    function SignUpService(http) {
        this.http = http;
        this.Myurl = "http://localhost:3005/signup";
    }
    //signUp(): Observable<Boolean> {
    //  console.log("reached signup service");
    //this.http.get(`http://localhost:3005/signup`);
    //console.log("exiting signup service");
    //return;
    //}
    /**
      signUp(): Promise<{}> {
        return this.http.get(this.Myurl)
                   .toPromise()
                   .catch(this.handleError);
      }
    
      private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
      }
    */
    SignUpService.prototype.signUp = function (fullname, email, passowrd, desired_city, desired_area, type_of_tenant) {
        var headers = new http_2.Headers();
        headers.append('Content-Type', 'application/json');
        //below will print {"fullname":"ttt","email":"yyy","passowrd":"aaaa","desired_city":"aaaa","desired_area":["abc","def"],"type_of_tenant":"ggg"}
        var json = JSON.stringify({ fullname: fullname, email: email, passowrd: passowrd, desired_city: desired_city, desired_area: ["abc", "def"], type_of_tenant: type_of_tenant });
        console.log(json);
        //var json = JSON.stringify({fullname: 'mohit' ,email: 'anand', passowrd: 'lamba', desired_city: 'boka', desired_area:["abc", "def"], type_of_tenant:'couple'});
        this.http.post(this.Myurl, json, { headers: headers }).map(function (res) { return res.json; }).toPromise().catch(this.handleError);
    };
    SignUpService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    return SignUpService;
}());
SignUpService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], SignUpService);
exports.SignUpService = SignUpService;
//# sourceMappingURL=signup.service.js.map