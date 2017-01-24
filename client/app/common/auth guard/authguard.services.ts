import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
// Import our authentication service
import { LoginService } from '../../login/services/login.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: LoginService, private router: Router) {}

  canActivate() {
    console.log("here");
    // If user is not logged in we'll send them to the homepage 
    if (!this.auth.isloggedIn()) {
      console.log("already logged in");
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}