"use strict";
var AppRoutes = (function () {
    function AppRoutes() {
    }
    return AppRoutes;
}());
AppRoutes.ipadr = "http://192.168.0.5:3005";
AppRoutes.loginURL = AppRoutes.ipadr + "/login";
AppRoutes.signUpURL = AppRoutes.ipadr + "/signup";
AppRoutes.getUserProfileURL = AppRoutes.ipadr + "/getUserProfile";
AppRoutes.getNotificationsURL = AppRoutes.ipadr + "/getNotifications";
AppRoutes.approveNotification = AppRoutes.ipadr + "/approveNotification";
exports.AppRoutes = AppRoutes;
//# sourceMappingURL=app-routes.js.map