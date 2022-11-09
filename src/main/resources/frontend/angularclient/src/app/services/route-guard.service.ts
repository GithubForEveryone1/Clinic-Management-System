import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate{
  loggedInUserStr: string | null = sessionStorage.getItem("loggedInUser");

  //parse JSON back to User object
  loggedInUser = this.loggedInUserStr ? JSON.parse(this.loggedInUserStr) : null;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // routing to the different pages based on the user account types
    // Hi Eunice, I commented this part out temporarily so that the routing works first =P
    // if (this.authenticationService.isUserLoggedIn() && this.loggedInUser.account_type == 'admin') {
    //   this.router.navigate(['admin']);
     
    // } else if(this.authenticationService.isUserLoggedIn() && this.loggedInUser.account_type == 'doctor') {
    //   this.router.navigate(['doctor']);
    //   console.log(this.loggedInUser.account_type);
    // } else if(this.authenticationService.isUserLoggedIn() && this.loggedInUser.account_type == 'nurse') {
    //   this.router.navigate(['nurse']);
      
    // } else if(this.authenticationService.isUserLoggedIn() && this.loggedInUser.account_type == 'patient') {
    //   this.router.navigate(['patient']);
    // }
    if (this.authenticationService.isUserLoggedIn()) {
      return true;
    }

    this.router.navigate(['login'])
    return false;
  }
}