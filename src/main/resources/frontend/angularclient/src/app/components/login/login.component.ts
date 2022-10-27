import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/common/user';
import { AuthenicationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = "";
  password = "";
  loginResult = "";

  constructor(private router: Router, private authenticationService: AuthenicationService) { }

  ngOnInit(): void {
  }

  submitLogin() {  
    const formData = {
      "email": this.email,
      "password": this.password
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
          this.router.navigate(['user-list']);
          sessionStorage.setItem("firstName", data.first_name);
          sessionStorage.setItem("email", data.email);
          sessionStorage.setItem("gender", data.gender);
        }
      }
    )

  }
}
