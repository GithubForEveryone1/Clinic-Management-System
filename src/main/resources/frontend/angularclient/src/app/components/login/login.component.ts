import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/common/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = {
    'user_id': NaN,
    'first_name': "",
    'last_name': "",
    'email': "",
    'address': "",
    'contact_number': NaN,
    'password': "",
    'dob': "",
    'gender': "",
    'account_type': "",
    'date_created': ""
  }

  badLoginAttempted = false;
  errorMsg = "";

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  fakeLogin() {
    this.badLoginAttempted = true;
    this.errorMsg = "Please verify all fields again.";
  }

  submitLogin() {
    this.badLoginAttempted = false;
    this.authenticationService.authenticateUser(this.user).subscribe(
      data => {
          this.router.navigate(['user']);
 
          sessionStorage.setItem("loggedInUser", JSON.stringify(data));
      },
      error => this.handleErrorResponse(error)
    )
  }

  handleErrorResponse(error:HttpErrorResponse) {
    this.errorMsg = error.error.message;
  }

}
