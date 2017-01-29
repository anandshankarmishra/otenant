import {Component} from '@angular/core'; 
import { Router, ActivatedRoute, Params } from '@angular/router';

import {TenantService} from '../../tenantHome/services/tenantHome.services';
import {LoginService} from '../../login/services/login.service';

@Component({
 selector:'delete-view',
 moduleId:module.id,
 templateUrl:'../deleteAccount.html',
 //styleUrls:['../tenantHome.css']
})

export class DeleteAccountComponent {
    
    private notLoggedInMsg = "You should be logged in to delete this account!";
    private wrongPasswordMsg = "Wrong password! Please enter correct password to proceed.";
    private error = '';

    constructor (private router: Router,
                 private tenantService: TenantService,
                 private loginService: LoginService) {

    }
    cancel() {
        this.router.navigate(['/home']);
    }

    deleteAccount(password:string) {
        let token = this.loginService.getToken();
        console.log("password:" + password + " token:" + token);
        if (token && password) {
            this.tenantService.deleteAccount(token,password).
                subscribe(
                    (data) => {
                        console.log("data:" + data.error + " status:" + data.status);
                        if (data.error == true && data.status == 999) {
                            this.error = this.wrongPasswordMsg;
                        } else if (data.error == false && data.status == 900) {
                            this.loginService.logout(); // remove token from local storage
                            this.router.navigate(['']);
                        }
                    },
                    (error)=> {
                        console.log("error:" + error.error);
                    }
                )
        } else {
            this.error = this.notLoggedInMsg;
        }
        
    }
}