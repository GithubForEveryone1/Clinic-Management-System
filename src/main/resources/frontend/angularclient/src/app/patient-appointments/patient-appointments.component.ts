import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from '../common/appointment';
import { AppointmentService } from '../services/appointment.service';


@Component({
  selector: 'app-patient-appointments',
  templateUrl: './patient-appointments.component.html',
  styleUrls: ['./patient-appointments.component.css']
})
export class PatientAppointmentsComponent implements OnInit {

  loggedInUserStr: string | null = sessionStorage.getItem("loggedInUser");

  //parse JSON back to User object
  loggedInUser = this.loggedInUserStr ? JSON.parse(this.loggedInUserStr) : null;
  patientId = this.loggedInUser.user_id;
  firstName = this.loggedInUser.first_name;
  lastName = this.loggedInUser.last_name;

  //tab and tab content status
  upcomingTabStatus = "active";
  upcomingTabContentStatus = "show active";
  pastTabStatus = "";
  pastTabContentStatus = "";

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
    this.appointmentService.getApptsByUserId(this.patientId).subscribe(
      data => {
        this.appts = data;
        this.filterApptsBeforeToday();
        this.filterApptsAfterToday();
        console.log(this.todayDate);
        console.log(Date.parse("2022-11-08T00:00:00.000+00:00"));
        console.log(this.appts);
        console.log(this.upcomingAppts);
        console.log(this.pastAppts);
      },
      error => this.handleErrorResponse(error),
    );
  }

  switchToUpcomingTab() {
    this.upcomingTabStatus = "active";
    this.upcomingTabContentStatus = "show active";
    this.pastTabStatus = "";
    this.pastTabContentStatus = "";
  }

  switchToPastTab() {
    this.upcomingTabStatus = "";
    this.upcomingTabContentStatus = "";
    this.pastTabStatus = "active";
    this.pastTabContentStatus = "show active";
  }

  handleErrorResponse(error:HttpErrorResponse) {
    this.errorMsg = error.error.message;
  }

  filterApptsBeforeToday() {
    this.appts.forEach((value) => {
      const apptDate = Date.parse(value.date_visited);
      if (apptDate < this.todayDate) {
        this.pastAppts.push(value);
      }
    });
  }

  filterApptsAfterToday() {
    this.appts.forEach((value) => {
      const apptDate = Date.parse(value.date_visited);
      if (apptDate >= this.todayDate) {
        this.upcomingAppts.push(value);
      }
    });
  }

}


