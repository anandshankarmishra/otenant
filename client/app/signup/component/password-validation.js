"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PasswordValidation = (function () {
    function PasswordValidation() {
    }
    PasswordValidation.MatchPassword = function (AC) {
        var password = AC.get('password').value; // to get value in input tag
        var confirmPassword = AC.get('repassword').value; // to get value in input tag
        if (password != confirmPassword) {
            console.log('false');
            AC.get('repassword').setErrors({ MatchPassword: true });
        }
        else {
            console.log('true');
            return null;
        }
    };
    return PasswordValidation;
}());
exports.PasswordValidation = PasswordValidation;
//# sourceMappingURL=password-validation.js.map