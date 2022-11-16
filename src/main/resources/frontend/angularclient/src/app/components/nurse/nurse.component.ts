import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/common/appointment';
import { User } from 'src/app/common/user';
import { AppointmentService } from 'src/app/services/appointment.service';
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
  
  //Date
  selectedDate = (new Date().toISOString().split('T')[0]);

  //Doctor's appointments
  doctorAppts: Appointment[] = [];
  doctorApptsErrorMsg = "";

  //Timeslot
  selectedTimeslot = NaN;

  constructor(private router: Router, private userService: UserService, private appointmentService: AppointmentService) { }

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

        this.getApptsByDoctorIdAndFilterByDate(this.selectedDoctor.user_id, this.selectedDate);

      },
      error => this.handleGetDoctorsErrorResponse(error),
    );
  }

  //method to initialise selected doctor
  initSelectedDoctor() {
    this.selectedDoctor = this.doctors[0];
  }

  //method to call appointmentService.getApptsByDoctorId() and then call filterDoctorApptsByDate()
  getApptsByDoctorIdAndFilterByDate(doctorId:number, selectedDate:string) {
    this.appointmentService.getApptsByDoctorId(doctorId).subscribe(
      data => {
        let tempAppts = data;
        console.log(tempAppts);
        this.filterDoctorApptsByDate(tempAppts, selectedDate);
        console.log(this.doctorAppts);
      },
      error => this.handleGetApptsByDoctorIdErrorResponse(error),
    );
  }

  //method to handle error response from userService.getDoctors()
  handleGetDoctorsErrorResponse(error:HttpErrorResponse) {
    this.doctorsErrorMsg = error.error.message;
  }

  //method filter doctor's appointments (based on selected doctor) by date
  filterDoctorApptsByDate(tempAppts: Appointment[], strDate: string) {
    tempAppts.forEach((element) => {
      if (formatDate(element.date_visited, "yyyy-MM-dd", "en") === strDate) {
        this.doctorAppts.push(element);
      }
    });
  }

  //method to handle error response from appointmentService.getApptsByDoctorId()
  handleGetApptsByDoctorIdErrorResponse(error:HttpErrorResponse) {
    this.doctorApptsErrorMsg = error.error.message;
  }

  //method to change selectedDoctor and change doctorAppts
  changeSelectedDoctor(theDoctorId: number) {
    const tempDoctor = this.doctors.find(doctor => doctor.user_id === theDoctorId);
    //this.selectedDoctor = tempDoctor ? tempDoctor : null;
    this.selectedDoctor = tempDoctor!;

    //reset doctorAppts and re-retrieve doctorAppts
    this.doctorAppts.length = 0;
    this.getApptsByDoctorIdAndFilterByDate(this.selectedDoctor.user_id, this.selectedDate);

  }
  
  //method to change selectedDate and change doctorAppts
  changeSelectedDate() {
    
    //reset doctorAppts and re-retrieve doctorAppts
    this.doctorAppts.length = 0;
    this.getApptsByDoctorIdAndFilterByDate(this.selectedDoctor.user_id, this.selectedDate);
  }

  //codes referenced and edited from Eunice to display appointment schedule
  // Patient Info
  patientFirstName = "";
  patientLastName = "";
  dob = "";
  patientAddress = "";
  contact = "";
  email = "";
  diagnosis = "";

  // display appt and patient info
  displayPatientInfo(slot: number) {
    //this.doctorAppts.forEach((value) => {

    if (this.doctorAppts.length === 0) {
      this.patientFirstName = "";
      this.patientLastName = "";
      this.dob = "";
      this.patientAddress = "";
      this.contact = "";
      this.email = "";
      this.diagnosis = "";
    }
    else {
      for (let value of this.doctorAppts) {
        //console.log(value);
        if (value.timeslot === slot) {
          const patient = value.patient;
          this.patientFirstName = patient.first_name;
          this.patientLastName = patient.last_name;
          this.dob = patient.dob;
          this.patientAddress = patient.address;
          this.contact = patient.contact_number;
          this.email = patient.email;
          this.diagnosis = value.diagnosis;
          break;
        } 
        else {
          this.patientFirstName = "";
          this.patientLastName = "";
          this.dob = "";
          this.patientAddress = "";
          this.contact = "";
          this.email = "";
          this.diagnosis = "";
        }
      }
    }
    //})
  }
  
  // reset display of appt and patient info
  resetPatientInfo() {
    this.patientFirstName = "";
    this.patientLastName = "";
    this.dob = "";
    this.patientAddress = "";
    this.contact = "";
    this.email = "";
    this.diagnosis = "";
  }

  // to indicate on the calendar which slots are taken
  isBooked(slot: number): string{
    let res = "false";
    
    this.doctorAppts.forEach((value) => {
      if(value.timeslot === slot){
        // console.log(value.timeslot === slot);
        res = "true";
      }
    })
    return res;
  }



}

