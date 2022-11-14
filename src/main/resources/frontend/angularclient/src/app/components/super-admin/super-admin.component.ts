
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

}

