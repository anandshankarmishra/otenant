import { Component, OnInit, Input, Output, OnChanges, EventEmitter, trigger, 
    state, style, animate, transition, NgModule } from '@angular/core';

import {Router} from '@angular/router';
import {LoginService} from '../../../login/services/login.service';
import {TenantService} from '../../../tenantHome/services/tenantHome.services';
import { Http } from '@angular/http';


@Component({
 selector:'notif-dialog',
 moduleId:module.id,
 templateUrl:'../notif.html',
 styleUrls:['../notif.css'],
 animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})

export class NotificationComponent implements OnInit { 
    @Input() closable = true;
    @Input() visible: boolean;
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    
    private myTokn = "";      //get tenant profile
    private newNotf:number; //new notifications
    private notifs = []; //get notifications in this array
    private approved: boolean = false; //disable approve button once notif is approved
    private isDisabled:boolean = false;

    private disabled:string = "";

    constructor(private loginService: LoginService,
                    private tenantService: TenantService,
                    private http:Http ) {
                this.myTokn = loginService.getToken();
                console.log("notifTokn:" + this.myTokn);
    }

    ngOnInit() {
        this.getNotifications(this.myTokn);
    }
    close() {
        this.visible = false;
        this.visibleChange.emit(this.visible);
    }

    getNotifications(token: string) : void {
        this.tenantService.getNotifications(token)
            .subscribe((data)=> this.notifs = data);
    }

    approve(notf) {
        this.tenantService.approveNotification(this.myTokn, notf)
        .subscribe((data) => {
                console.log("error:" + data.error);
                  if(data.error == false)
                   this.approved = true;
                    //this.disableButton();
                  
                })
    }

    disableButton(notf) {
        if (this.approved = true)
        //this.isDisabled = true;
        {
            {document.getElementById(notf._id).style.visibility="hidden";}
        }
        
    }
}