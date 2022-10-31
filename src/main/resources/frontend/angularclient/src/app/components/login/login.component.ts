import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/common/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = "";
  password = "";

  errorMsg = "";

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  submitLogin() {  
    const formData = {
      'email': this.email,
      'password': this.password
    }

    this.authenticationService.authenticateUser(formData).subscribe(
      data => {
        if (data === null) {
          console.log("Wrong email / Wrong password");
        }
        else if (data.password === "") {
          console.log("Wrong password");
        }
        else {
          this.router.navigate(['test']);
          sessionStorage.setItem("firstName", data.first_name);
          sessionStorage.setItem("email", data.email);
          sessionStorage.setItem("gender", data.gender);
        }
      },
      error => this.handleErrorResponse(error)
    )
  }

  handleErrorResponse(error:HttpErrorResponse) {
    console.log(error);
    console.log(error.error);
    console.log(error.error.message);
    this.errorMsg = error.error.message;
  }

}
