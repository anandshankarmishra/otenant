"use strict";
var Tenant = (function () {
    function Tenant(fullName, email, password, city, area, lookingFor) {
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.city = city;
        this.area = area;
        this.lookingFor = lookingFor;
    }
    return Tenant;
}());
exports.Tenant = Tenant;
//# sourceMappingURL=tenant.js.map