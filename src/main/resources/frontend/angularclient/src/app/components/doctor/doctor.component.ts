import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from 'src/app/common/appointment';
import { AppointmentService } from 'src/app/services/appointment.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  loggedInUserStr: string | null = sessionStorage.getItem("loggedInUser");

  //parse JSON back to User object
  loggedInUser = this.loggedInUserStr ? JSON.parse(this.loggedInUserStr) : null;

  doctorId = this.loggedInUser.user_id;
  firstName = this.loggedInUser.first_name;
  lastName = this.loggedInUser.last_name;
  dob = this.loggedInUser.dob;
  address = this.loggedInUser.address;
  contactNo = this.loggedInUser.contact_number;
  email = this.loggedInUser.email;
  gender = this.loggedInUser.gender;
  accountType = this.loggedInUser.account_type;

  //today's date
  today = new Date();
  todayDate = this.today.valueOf();

  //Appointments
  appts: Appointment[] = [];
  pastAppts: Appointment[] = [];
  upcomingAppts: Appointment[] = [];

  //Error message from backend server
  errorMsg = "";

  constructor(private router: Router, private appointmentService: AppointmentService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.appointmentService.getApptsByDoctorId(this.doctorId).subscribe(
      data => {
        this.appts = data;
        console.log(this.appts);
       
      },
      error => this.handleErrorResponse(error),
    );
  }

  handleErrorResponse(error:HttpErrorResponse) {
    this.errorMsg = error.error.message;
  }

}
