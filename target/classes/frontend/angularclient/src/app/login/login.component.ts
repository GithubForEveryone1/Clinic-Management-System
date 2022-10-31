import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../common/user';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = 'test@email.com'
  password = 'test'
  errorMessage = 'Invalid Credentials'
  invalidLogin = false

  //Router
  //Angular.giveMeRouter
  //Dependency Injection

  constructor(private router: Router,
    private authentication: AuthenticationService) { }

  ngOnInit(): void {
  }

  handleLogin() {
    const user: User = {
      user_id: undefined,
      first_name: '',
      last_name: '',
      email: '',
      address: '',
      contact_number: undefined,
      password: '',
      dob: '',
      gender: '',
      account_type: '',
      date_created: ''
    };
    
    user.email = this.email;
    user.password = this.password;

    this.authentication.authenticate(user).subscribe(
      data => {
        if (data === null) {
          this.invalidLogin = true;
          console.log("Wrong email / Wrong password");
        }
        else if (data.password !== this.password) {
          this.invalidLogin = true;
          console.log("Wrong password");
        }
        else {
          //Redirect to Welcome Page
          this.router.navigate(['user-list'])

          this.invalidLogin = false

          sessionStorage.setItem("authenticatedUser", JSON.stringify(data))
        }
      }
    )

    /*
    if(this.email === "test@email.com" && this.password === "test") {
      //Redirect to Welcome Page
      this.router.navigate(['user-list'])

      this.invalidLogin = false
    } else {
      this.invalidLogin = true
    }
    */
  }
}
