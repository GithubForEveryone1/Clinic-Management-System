import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Query } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/common/user';
import { UserService } from 'src/app/services/user.service';


@Component({
	selector: 'app-super-admin',
	templateUrl: './super-admin.component.html',
	styleUrls: ['./super-admin.component.css']
})
export class SuperAdminComponent implements OnInit {
	
	role = [
		"doctor",
		"nurse"
	];
	
	
	user: User = {
		'user_id': NaN,
		'first_name': "a",
		'last_name': "a",
		'email': "",
		'address': "q",
		'contact_number': "88888888",
		'password': "",
		'dob': "",
		'gender': "N/a",
		'account_type': "",
		'date_created': ""
	}

	badRegisterAttempted = false;
	errorMsg = "";
	successMsg = "";
	max = new Date().toISOString().split('T')[0];
	min = "1900-01-01";
	userUnder18 = false;

	// This is for the delete user part, not to be included once we're done with it
	// It's just for easily deleting accounts on the frontend for now
	emailForDelete = "";

	constructor(private router: Router, private userService: UserService) { }

	ngOnInit(): void {
	}

	trying = "test";

	fakeRegister() {
		this.badRegisterAttempted = true;
		this.successMsg = "";
		this.errorMsg = "Please verify that all fields have been filled in correctly.";
	}

	submitRegister() {
		this.userService.createUser(this.user).subscribe(
			data => {
				this.router.navigate(['login'], { queryParams: { registered: 'true' } });
			},
			error => this.handleRegisterErrorResponse(error)
		)
	}

	handleRegisterErrorResponse(error: HttpErrorResponse) {
		//console.log(error);
		//console.log(error.error);
		//console.log(error.error.message);
		this.successMsg = "";
		this.errorMsg = error.error.message;
	}

	submitDelete() {
		const formData = {
			'email': this.emailForDelete
		}
		console.log("Deleting " + formData.email);
		this.userService.deleteUser(formData).subscribe(
			data => { }
		)
	}

	// Sets the DOB max because the HTML nonsense is dumb
	// Put error class if age is not at least 18
	enforceBoundsAndCheckForError() {
		if (this.user.dob != "") {
			if (this.user.dob > this.max) {
				this.user.dob = this.max;
			}
			else if (this.user.dob < this.min) {
				this.user.dob = this.min;
			}

			else if (
				new Date(new Date(this.max).setFullYear(new Date(this.max).getFullYear() - 18)) <
				new Date(this.user.dob)
			) {
				console.log(new Date(new Date(this.max).setFullYear(new Date(this.max).getFullYear() - 18)));
				this.userUnder18 = true;
			}

			else {
				this.userUnder18 = false;
			}
		}
	}
}