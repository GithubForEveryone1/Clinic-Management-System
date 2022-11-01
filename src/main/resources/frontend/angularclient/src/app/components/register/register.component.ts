import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  first_name = "";
  last_name = "";
  email = "";
  address = "";
  password = "";
  contact_number?: number;
  dob: Date = new Date();
  gender = "";
  
  emailForDelete = "";

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  submitRegister() {  
    const formData = {
      'first_name': this.first_name,
      'last_name': this.last_name,
      'email': this.email,
      'address': this.address,
      'contact_number': this.contact_number,
      'password': this.password,
      'dob': this.dob,
      'dateCreated': new Date(),
      'account_type': "patient",
      'gender': this.gender,
    }

    this.userService.createUser(formData).subscribe(
      data => {}
      )
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

