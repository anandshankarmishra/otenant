import {Component} from '@angular/core';
import {LoginService} from '../../../login/services/login.service';
import {TenantService} from '../../../tenantHome/services/tenantHome.services';


@Component({
 selector:'uploadImage',
 moduleId:module.id,
 templateUrl:'../uploadImage.html',
 styleUrls:['../uploadImage.css']
})

export class UploadImageComponent {
    private imgSrc;
    private errorMsg = '';
    private failedMsg = 'Failed to load image. Try again!';


    constructor(private loginService: LoginService,
                private TenantService: TenantService) {

    }

    upload(img) {
        console.log("image:" + img);
        this.imgSrc = img;
    }

    imageUploaded($event) {
        let img = $event.file; 
        console.log("event:" + img.name);
        let token = this.loginService.getToken();

        if (token) {
            this.TenantService.uploadImage(token, img ).
            subscribe((data) => {
                console.log("data:" + data.error);
            }, 
            (error)=> {
                console.log(" error:" + JSON.stringify(error));
            }
            
            ); 
        } else {
            this.errorMsg = this.failedMsg;
        }


    }

}