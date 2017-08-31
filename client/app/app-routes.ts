export class AppRoutes {
    //public static ipadr = "http://192.168.0.8:3005";
    public static ipadr = "http://10.5.50.178:3005";    
    //public static ipadr = "http://192.168.0.221:3005";
    public static searchTenantsURL = AppRoutes.ipadr + "/searchTenants";
    public static inviteTenantURL = AppRoutes.ipadr + "/inviteTenant";
    public static loginURL = AppRoutes.ipadr + "/login";
    public static signUpURL = AppRoutes.ipadr + "/signup";
    public static getUserProfileURL = AppRoutes.ipadr + "/getUserProfile";
    public static getNotificationsURL = AppRoutes.ipadr + "/getNotifications";
    public static approveNotification = AppRoutes.ipadr + "/approveNotification";
    public static changePassword = AppRoutes.ipadr + "/changePassword";
    public static deleteAccountURL = AppRoutes.ipadr + "/deleteAccount";
    public static updateUserFullNameURL = AppRoutes.ipadr + "/updateUserFullName"
    public static uploadImageURL = AppRoutes.ipadr + "/uploadPhoto";
    public static updateUserProfileURL = AppRoutes.ipadr + "/updateUserProfile";
}
