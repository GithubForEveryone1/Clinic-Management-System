import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/common/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nurse',
  templateUrl: './nurse.component.html',
  styleUrls: ['./nurse.component.css']
})
export class NurseComponent implements OnInit {
  loggedInUserStr: string | null = sessionStorage.getItem("loggedInUser");

  //parse JSON back to User object
  loggedInUser = this.loggedInUserStr ? JSON.parse(this.loggedInUserStr) : null;
  nurseId = this.loggedInUser.user_id;
  firstName = this.loggedInUser.first_name;
  lastName = this.loggedInUser.last_name;
  accountType = this.loggedInUser.account_type;

  //Doctors
  doctors: User[] = [];
  doctorsErrorMsg = "";
  selectedDoctor: User = {
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
	};
  
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    
    if (this.accountType != 'nurse') {
      this.router.navigate(['error']);
    };

    this.userService.getDoctors().subscribe(
      data => {
        this.doctors = data;
        console.log(this.doctors);
        this.initSelectedDoctor();
        //console.log(this.doctors[0]);
        //console.log(this.selectedDoctor);
      },
      error => this.handleGetDoctorsErrorResponse(error),
    );


  }

  initSelectedDoctor() {
    this.selectedDoctor = this.doctors[0];
  }

  handleGetDoctorsErrorResponse(error:HttpErrorResponse) {
    this.doctorsErrorMsg = error.error.message;
  }

  changeSelectedDoctor(theDoctorId: number) {
    const tempDoctor = this.doctors.find(doctor => doctor.user_id === theDoctorId);
    //this.selectedDoctor = tempDoctor ? tempDoctor : null;
    this.selectedDoctor = tempDoctor!;
  }
}
