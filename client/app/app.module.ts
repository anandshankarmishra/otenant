import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//component imports
import { AppComponent }  from './app.component';
import { HomePageComponent } from './homepage/component/homepage.component';
import { SignUpComponent } from './signup/component/signup.component';
import { ControlMessagesComponent } from './signup/component/control-messages.component';
import { LoginComponent } from './login/component/login.component';
import { SearchTenantsComponent} from './searchTenants/component/searchTenantsComponent';
import { SearchFormComponent } from './common/search/component/searchFormComponent';
import { InviteTenantComponent } from './inviteTenant/component/inviteTenant.component';
import { TenantHomeComponent} from './tenantHome/component/tenantHome.component';
import { NotificationComponent} from './common/notifications/component/notifications.component';

//import { SearchTenantsComponent } from './searchTenants/component/searchTenants.component';

//service imports
import { LoginService } from './login/services/login.service';
import { SignUpService } from './signup/services/signup.service';
import { ValidationService } from './signup/services/validation.service';
import { SearchTenantsService } from './searchTenants/services/searchTenants.services';
import { InviteTenantService } from './inviteTenant/services/inviteTenant.services';
import {AuthGuard} from './common/auth guard/authguard.services';
import { TenantService } from './tenantHome/services/tenantHome.services';


import { AppRoutingModule }     from './app-routing.module';



@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  
  declarations: [ 
    AppComponent,
    HomePageComponent,
    SignUpComponent,
    LoginComponent,
    ControlMessagesComponent,
    SearchTenantsComponent,
    SearchFormComponent,
    InviteTenantComponent,
    TenantHomeComponent,
    NotificationComponent

  ],

  providers: [ 
    SignUpService,
    LoginService,
    ValidationService,
    SearchTenantsService,
    InviteTenantService,
    AuthGuard,
    TenantService

  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
