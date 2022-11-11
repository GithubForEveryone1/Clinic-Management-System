import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
		'contact_number': "",
		'password': "",
		'dob': "",
		'gender': "",
		'account_type': "",
		'date_created': ""
	}

	badLoginAttempted = false;
	errorMsg = "";
	userCreatedMsg = "";

	constructor(private router: Router, private authenticationService: AuthenticationService, private route: ActivatedRoute) { }

	ngOnInit(): void {
		this.route.queryParams.subscribe(params => {
			if (params['registered'] !== undefined && params['registered'] === 'true') {
				this.userCreatedMsg = 'Account created successfully!';
			}
		});
	}

	fakeLogin() {
		this.badLoginAttempted = true;
		this.errorMsg = "Please verify all fields again.";
	}

  submitLogin() {
    this.badLoginAttempted = false;
    this.authenticationService.authenticateUser(this.user).subscribe(
      data => {
		sessionStorage.setItem("type", (data.account_type));
          sessionStorage.setItem("loggedInUser", JSON.stringify(data));
          console.log(this.user)
          switch (data.account_type) {
            case "patient":
              this.router.navigate(['patient']);
              break
            case "doctor":
              this.router.navigate(['doctor']);
              break
            case "nurse":
              this.router.navigate(['nurse']);
              break
              
            default:
              console.log("Something went wrong");
            }
      },
      error => this.handleErrorResponse(error)
    )
  }

	handleErrorResponse(error: HttpErrorResponse) {
		this.errorMsg = error.error.message;
	}

}