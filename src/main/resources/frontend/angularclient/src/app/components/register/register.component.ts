import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/common/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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

  badRegisterAttempted = false;
  errorMsg = "";
  successMsg = "";

  // This is for the delete user part, not to be included once we're done with it
  // It's just for easily deleting accounts on the frontend for now
  emailForDelete = "";

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  fakeRegister() {
    this.badRegisterAttempted = true;
    this.successMsg = "";
    this.errorMsg = "Please verify all fields again.";
  }

  submitRegister() { 
    this.userService.createUser(this.user).subscribe(
      data => {
        this.successMsg = "User created!"; 
        this.errorMsg = "";
      },
      error => this.handleRegisterErrorResponse(error)
    )
  }

  handleRegisterErrorResponse(error:HttpErrorResponse) {
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
      data => {}
      )
  }
}
