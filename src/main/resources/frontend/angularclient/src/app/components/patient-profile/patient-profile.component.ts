import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/common/user';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {
  
  loggedInUserStr: string | null = sessionStorage.getItem("loggedInUser");

  //parse JSON back to User object
  loggedInUser = this.loggedInUserStr ? JSON.parse(this.loggedInUserStr) : null;

  patientId = this.loggedInUser.user_id;
  firstName = this.loggedInUser.first_name;
  lastName = this.loggedInUser.last_name;
  dob = this.loggedInUser.dob;
  address = this.loggedInUser.address;
  contactNo = this.loggedInUser.contact_number;
  email = this.loggedInUser.email;
  gender = this.loggedInUser.gender;

  constructor() { }

  ngOnInit(): void {
    console.log(this.loggedInUser);
  }

}
