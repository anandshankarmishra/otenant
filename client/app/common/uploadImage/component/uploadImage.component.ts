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
    private uploadImg:boolean = false;
    private imgFile;
    private errorMsg = '';
    private failedMsg = 'Failed to load image. Try again!';


    constructor(private loginService: LoginService,
                private TenantService: TenantService) {

    }

    upload() {
        console.log("uploading..");
        
        let token = this.loginService.getToken();
        if (token && this.imgFile) {
            this.TenantService.uploadImage(token, this.imgFile ).
            subscribe((data) => {
                console.log("data:" + data.error);//successful
                this.uploadImg = false;
            }, 
            (error)=> {
                console.log(" error:" + JSON.stringify(error));
            }
            
            ); 
        } else {
            this.errorMsg = this.failedMsg;
        }

    }

    imageUploaded($event) {
        this.imgFile = $event.file; 
        console.log("event:" + this.imgFile.name);
    }
}