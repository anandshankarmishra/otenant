import {Component, NgModule} from '@angular/core';

@Component({
 selector:'homepage',
 moduleId:module.id,
 templateUrl:'../homepage.html',
 styleUrls:['../homepage.css']   
})
export class HomePageComponent { 
    showDialog = false;
    showLoginDialog = false;
  
  constructor() { }

}