import { Component, OnInit, Input,Output, NgModule, EventEmitter, HostListener,Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Tenant} from '../../models/tenant';
import { DOCUMENT } from '@angular/platform-browser';


@Component({
 selector:'test-view',
 moduleId:module.id,
 templateUrl:'../test.html',
 styleUrls:['../test.css']   
})

export class TestComponent implements OnInit {
    
   
    ngOnInit() {}
 
    private searchedTenants:Tenant[] = [];    
        
    handleSearchedTenants(tenants:Tenant[]){
        if (this.searchedTenants.length == 0) {
            this.searchedTenants = tenants;    
        } else {
            console.log("here in laundap:");
            tenants.map(te => this.searchedTenants.push(te));
        }
        
        //console.log(tenants);
        //event.map(t => console.log(t.userFullName));
    }
    
    handleResetTenantsArray(event) {
        if(event == true) {
            console.log("reset:" + event);
            this.searchedTenants = [];
        }
    }
    
}


@Component({
    selector: 'track-scroll',
    template: ''
})
export class TrackScrollComponent {
   constructor(@Inject(DOCUMENT) private document: Document){}
   
   @Input()
   dontEmit;
   
   
   @Output()
    pageScrolled = new EventEmitter();  
    
  @HostListener('window:scroll', ['$event'])
    track(event) {
    
    var windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    var body = document.body, html = document.documentElement;
    var docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    var windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
        if (this.dontEmit == true) {
            console.log("dontEmit:" + this.dontEmit);
            return;
        }
        console.log('valid event');
        this.pageScrolled.emit();
    }
    }
}