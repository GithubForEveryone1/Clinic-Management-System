import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from 'src/app/common/appointment';
import { AppointmentService } from 'src/app/services/appointment.service';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { formatDate } from '@angular/common';

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
  accountType = this.loggedInUser.account_type;

  //today's date
  todayDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');

  //Appointments
  appts: Appointment[] = [];
  tdyAppts: Appointment[] = [];
  pastAppts: Appointment[] = [];
  upcomingAppts: Appointment[] = [];

  //Patient Info
  patientFirstName = "";
  patientLastName = "";
  dob = "";
  patientAddress = "";
  contact = "";
  email = "";
  diagnosis = "";

  //Error message from backend server
  errorMsg = "";

  constructor(
    private router: Router, 
    private appointmentService: AppointmentService, 
    private userService: UserService, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.appointmentService.getApptsByDoctorId(this.doctorId).subscribe(
      data => {
        this.appts = data;
        console.log(this.appts);
        this.displayTdyAppts();
        console.log(this.tdyAppts);
      },
      error => this.handleErrorResponse(error),
    );
  }

  handleErrorResponse(error:HttpErrorResponse) {
    this.errorMsg = error.error.message;
  }

  //get the appointments based on today's date
  displayTdyAppts() {
    this.appts.forEach((value) => {
      if(formatDate(value.date_visited, 'yyyy-MM-dd', 'en') === this.todayDate){
        this.tdyAppts.push(value);
        // console.log(formatDate(value.date_visited, 'yyyy-MM-dd', 'en') === this.todayDate);
      }
      ;
    })
  }

  // display info based on tdy's date
  displayPatientInfo(slot: number) {
    this.tdyAppts.forEach((value) => {
      console.log(value);
      if (value.timeslot === slot) {
        const patient = value.patient;
        this.patientFirstName = patient.first_name;
        this.patientLastName = patient.last_name;
        this.dob = patient.dob;
        this.patientAddress = patient.address;
        this.contact = patient.contact_number;
        this.email = patient.email;
        this.diagnosis = value.diagnosis;
      } 
    })
  }
  
  // to indicate on the calendar which slots are taken
  isBooked(slot: number): string{
    let res = "false";
    
    this.tdyAppts.forEach((value) => {
      if(value.timeslot === slot){
        // console.log(value.timeslot === slot);
        res = "true";
      }
    })
    return res;
  }
  
}
