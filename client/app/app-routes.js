"use strict";
var AppRoutes = (function () {
    function AppRoutes() {
    }
    return AppRoutes;
}());
AppRoutes.ipadr = "http://192.168.0.7:3005";
AppRoutes.searchTenantsURL = AppRoutes.ipadr + "/searchTenants";
AppRoutes.inviteTenantURL = AppRoutes.ipadr + "/inviteTenant";
AppRoutes.loginURL = AppRoutes.ipadr + "/login";
AppRoutes.signUpURL = AppRoutes.ipadr + "/signup";
AppRoutes.getUserProfileURL = AppRoutes.ipadr + "/getUserProfile";
AppRoutes.getNotificationsURL = AppRoutes.ipadr + "/getNotifications";
AppRoutes.approveNotification = AppRoutes.ipadr + "/approveNotification";
AppRoutes.deleteAccountURL = AppRoutes.ipadr + "/deleteAccount";
exports.AppRoutes = AppRoutes;
//# sourceMappingURL=app-routes.js.map