import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from 'src/app/common/appointment';
import { AppointmentService } from 'src/app/services/appointment.service';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { User } from 'src/app/common/user';
import { InventoryService } from 'src/app/services/inventory.service';
import { Inventory } from 'src/app/common/inventory';

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

  //Patient Info
  patientFirstName = "";
  patientLastName = "";
  dob = "";
  patientAddress = "";
  contact = "";
  email = "";
  diagnosis = "";

  // doctor adding diagnosis
  apptId = NaN;
  patientId = NaN;
  dateVisited = "";
  prescription = "";
  timeslot = NaN;

  //Error message from backend server
  errorMsg = "";

  //meds
  meds: Inventory[] = [];
  product_name ="";
  quantity = "";

  constructor(
    private router: Router, 
    private appointmentService: AppointmentService, 
    private userService: UserService,
    private inventoryService: InventoryService, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.appointmentService.getApptsByDoctorId(this.doctorId).subscribe(
      data => {
        this.appts = data;
        console.log(this.appts);
        this.displayTdyAppts();
        console.log(this.tdyAppts);
        this.showMeds();
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
        this.patientId = value.patient_id
        this.apptId = value.appt_id;
        this.dateVisited = value.date_visited;
        this.timeslot = value.timeslot;
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
  
  // method to add in diagnosis and prescription 
  addDiagnosis(){
     // This is POSTed to the backend
     let appt = {
       "appt_id": this.apptId,
      "diagnosis": this.diagnosis,
      "prescription": this.product_name + "-" + this.quantity
     };
    
    //  console.log(this.appointmentService.editAppt(appt));
     this.appointmentService.editApptDiagnosisAndPrescription(appt).subscribe(
       data => {
        console.log(data)
        let query = {
          // pass patient name
          "Patient": this.patientFirstName + " " + this.patientLastName,
          // pass diagnosis 
          "Diagnosis": data.diagnosis,
          // pass prepscription 
          "Prescription": data.prescription,
        };
        this.router.navigate(['doctor/add-diagnosis-success'], {queryParams: query});
       },
       error => {
        this.router.navigate(['doctor/add-diagnosis-failure']);
       }
     )
 }

   // Show overlay for patient history
   hideHistory = true;
   selectedPatient = {} as User;
   showOverlay() {
     this.hideHistory = false;
     this.selectedPatient = {
      'user_id': this.patientId,
      'first_name': this.patientFirstName,
      'last_name': this.patientLastName,
      'contact_number': '', // These are just blank because we don't need them
      'dob': '',            //
      'email': '',          //
      'date_created': '',   //
      'gender': '',         //
      'address': '',        //
      'password': '',       //
      'account_type': ''    // These are just blank because we don't need them
     };
 
     setTimeout(() => {
       document.getElementById("patient-history-overlay")!.style.opacity = "1";
     }, 50) // Need to sleep so that the opacity only changes AFTER DOM element is unhidden for CSS transition to work
   }
   
   hideOverlay() {
     document.getElementById("patient-history-overlay")!.style.opacity = "0";
     setTimeout(() => {
       this.hideHistory = true;
     }, 300) // Need to sleep so that the hidden parameter only changes AFTER CSS transition is finished, this 300ms is also in the css transition set to 0.3s
   }
   // End overlay

    // display all medicine in inventory
    showMeds(){
      this.inventoryService.getInventoryList().subscribe(
        data => {
          this.meds = data;
        }
      )
     }
}
