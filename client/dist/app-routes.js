"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppRoutes = (function () {
    function AppRoutes() {
    }
    return AppRoutes;
}());
AppRoutes.ipadr = "http://localhost:3005";
AppRoutes.searchTenantsURL = AppRoutes.ipadr + "/searchTenants";
AppRoutes.inviteTenantURL = AppRoutes.ipadr + "/inviteTenant";
AppRoutes.loginURL = AppRoutes.ipadr + "/login";
AppRoutes.signUpURL = AppRoutes.ipadr + "/signup";
AppRoutes.getUserProfileURL = AppRoutes.ipadr + "/getUserProfile";
AppRoutes.getNotificationsURL = AppRoutes.ipadr + "/getNotifications";
AppRoutes.approveNotification = AppRoutes.ipadr + "/approveNotification";
AppRoutes.changePassword = AppRoutes.ipadr + "/changePassword";
AppRoutes.deleteAccountURL = AppRoutes.ipadr + "/deleteAccount";
AppRoutes.updateUserFullNameURL = AppRoutes.ipadr + "/updateUserFullName";
AppRoutes.uploadImageURL = AppRoutes.ipadr + "/uploadPhoto";
AppRoutes.updateUserProfileURL = AppRoutes.ipadr + "/updateUserProfile";
exports.AppRoutes = AppRoutes;
//# sourceMappingURL=app-routes.js.map