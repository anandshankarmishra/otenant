import { Component, OnInit, Input, Output, OnChanges, EventEmitter, trigger, 
    state, style, animate, transition, NgModule } from '@angular/core';

import {LoginService} from '../services/login.service';

@Component({
 selector:'login-dialog',
 moduleId:module.id,
 templateUrl:'../login.html',
 styleUrls:['../login.css'],
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
export class LoginComponent { 
    @Input() closable = true;
    @Input() visible: boolean;
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private loginservice:LoginService) { }

    ngOnInit() { }

    close() {
        this.visible = false;
        this.visibleChange.emit(this.visible);
    }

    //@Input() firstName;
    
    login(username, password){
        console.log(username);
        console.log(password);
        
    
    
    }

      onSubmit({ value}: { value: String}) {
      console.log('hi');
      console.log(value);

      //this.loginservice.login(username, password);       

    }

}