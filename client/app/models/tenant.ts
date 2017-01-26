export class Tenant {
  
    _id: string;
    userTypeOfTenant: string;
    userDesiredCity: string;
    userFullName: string;
    userPassword: string;
    userEmail: string;
    userNotifications: string[];
    userDesiredArea: string[];
    userCurrentCity: string;
    userCurrentArea: string;
    userPhoneNo: string;
    userRequirementDescription: string;
    userPhotoFileName: string;

    
    /*email: string;
    password: string;
    city: string;
    area: string;
    lookingFor: string*/

    constructor(
      _id:string,
      _fullName:string
   /*   _email: string,
    _password: string,
    _city: string,
    _area: string,
    _lookingFor: string*/

    ) {}


}
