import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

	constructor(public authenticationService: AuthenticationService) { }
	
	jsonFirstName = JSON.parse(sessionStorage.getItem("loggedInUser") || '{}');
	
	ngOnInit() {	
		console.log(sessionStorage.getItem("type"));
		console.log(this.jsonFirstName.first_name);
	}
	
	getFirstName() {
		return this.jsonFirstName.first_name
	}

}
