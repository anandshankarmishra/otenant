import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent }  from './app.component';
import { HomePageComponent } from './homepage/component/homepage.component';
import { SignUpComponent } from './signup/component/signup.component';
import { LoginComponent } from './login/component/login.component';
import { LoginService } from './login/services/login.service';
import { SignUpService } from './signup/services/signup.service';



@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  
  declarations: [ 
    AppComponent,
    HomePageComponent,
    SignUpComponent,
    LoginComponent
  ],

  providers: [ 
    SignUpService,
    LoginService

  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
