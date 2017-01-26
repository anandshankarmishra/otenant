import {Component} from '@angular/core';

@Component({
 selector:'uploadImage',
 moduleId:module.id,
 templateUrl:'../uploadImage.html',
 styleUrls:['../uploadImage.css']
})

export class UploadImageComponent {
    private imgSrc;;
    upload(img) {
        console.log("image:" + img);
        this.imgSrc = img;
    }
}