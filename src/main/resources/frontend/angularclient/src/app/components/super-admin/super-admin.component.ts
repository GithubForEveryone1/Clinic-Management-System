import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Query, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/common/user';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ClosingService } from 'src/app/services/closing.service';
import { Closing } from 'src/app/common/closing';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/components/modal/modal.component';


@Component({
	selector: 'app-super-admin',
	templateUrl: './super-admin.component.html',
	styleUrls: ['./super-admin.component.css']
})

export class SuperAdminComponent implements OnInit {

	message!: string;
	errorMessage!: string;
	beforeUpdate = true;
	afterUpdate = false;
	findEmail = '';

	role = [
		"doctor",
		"nurse"
	];

	/* createForm = new FormGroup({
		user: new FormControl('',[Validators.required]),
		password: new FormControl(''),
	})  */

	user: User = {
		'user_id': NaN,
		'first_name': "",
		'last_name': "",
		'email': "",
		'address': "n/a",
		'contact_number': "99999999",
		'password': "",
		'dob': "",
		'gender': "n/a",
		'account_type': "",
		'date_created': ""
	}

	closingDate: Closing = {
		'closing_date': new Date((new Date()).getTime() + 24 * 60 * 60 * 1000),
		'description': 'super_admin block date'
	};

	/* get newUser() {
		return this.createForm.get('user');
	} */

	badRegisterAttempted = false;
	errorMsg = "";
	successMsg = "";
	max = new Date().toISOString().split('T')[0];
	min = "1900-01-01";
	userUnder18 = false;

	// This is for the delete user part, not to be included once we're done with it
	// It's just for easily deleting accounts on the frontend for now
	emailForDelete = "";

	constructor(private modalService: NgbModal, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService, private userService: UserService, private closingService: ClosingService) { }

	ngOnInit(): void {
	}

	fetchUserDetail() {
		this.userService.authenticateEmail(this.findEmail).subscribe(
			data => {
				console.log(data);
				this.beforeUpdate = false;
				this.afterUpdate = true;
				/* this.openMyModal(data); */
				this.user.user_id = data.user_id;
				this.user.first_name = data.first_name;
				this.user.last_name = data.last_name;
				this.user.email = data.email;
				this.user.password = data.password;
			},
			error => this.errorMessage = "Email does not exist"
		)
	}

	submitUpdate() {
		console.log(this.user);
		this.userService.updateUser(this.user).subscribe(
			data => {
				console.log(data);
				this.beforeUpdate = true;
				this.afterUpdate = false;
				/* this.openMyModal(data); */
				this.message = "User has been updated successfully!"
			},
			error => this.errorMessage = "rip bozo"
		)
	}

	openMyModal(response: any) {
		const modalRef = this.modalService.open(ModalComponent);
		modalRef.componentInstance.response = response;
	}

	fakeRegister() {
		this.badRegisterAttempted = true;
		this.successMsg = "";
		this.errorMsg = "Please verify that all fields have been filled in correctly.";
	}

	submitRegister() {
		this.userService.createUser(this.user).subscribe(
			data => {
				this.message = "User has been created successfully!"
				/* this.router.navigate(['login'], { queryParams: { registered: 'true' } }); */
			},
			error => this.handleRegisterErrorResponse(error)
		)
	}

	handleRegisterErrorResponse(error: HttpErrorResponse) {
		//console.log(error);
		//console.log(error.error);
		//console.log(error.error.message);
		this.errorMessage = "Email already exists";

	}

	submitDelete() {
		const formData = {
			'email': this.user.email
		}
		console.log("Deleting " + formData.email);
		this.userService.deleteUser(formData).subscribe(
			response => {
				console.log(response);
				this.message = "User has been deleted successfully!"
			},
			error => this.errorMessage = "Email does not exist"
		)
	}

	submitClosingDate() {
		console.log(this.closingDate);
		this.closingService.getClosingDate(this.closingDate).subscribe(
			data => {
				this.message = "Block date success!"
				/* this.router.navigate(['login'], { queryParams: { registered: 'true' } }); */
			},
			error => this.errorMessage = "cmi"
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


