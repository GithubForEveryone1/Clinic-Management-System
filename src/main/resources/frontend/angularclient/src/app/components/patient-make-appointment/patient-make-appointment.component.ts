import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/common/user';
import { Appointment } from 'src/app/common/appointment';
import { AppointmentService } from 'src/app/services/appointment.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-make-appointment',
  templateUrl: './patient-make-appointment.component.html',
  styleUrls: ['./patient-make-appointment.component.css']
})
export class PatientMakeAppointmentComponent implements OnInit {

  description = "";
  selectedDate = "";
  max = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0];
  min = new Date().toISOString().split('T')[0];

  // These two stores data being retrieved from backend
  allAppts: Appointment[] = [];
  allDoctors: User[] = [];

  // These two stores data to be used for display 
  appts:string[][] = [];
  doctors:string[][] = [];

  // This stores appointments only for the date selected by the user
  allApptsOnSelectedDate: Appointment[] = [];

  // These are binded to the front to get the user's selections
  selectedAppt = "";
  selectedDr = "";

  timeslots: {[key: number]: string} = {
    1:  '8:00 AM',
    2:  '9:00 AM',
    3:  '10:00 AM',
    4:  '11:00 AM',
    5:  '1:00 PM',
    6:  '2:00 PM',
    7:  '3:00 PM',
    8:  '4:00 PM',
    9:  '6:00 PM',
    10: '7:00 PM',
    11: '8:00 PM'
  }

  constructor(private appointmentService: AppointmentService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.appointmentService.getApptsList().subscribe(
      data => {
        this.allAppts = data;
      }
    );

    this.userService.getUserList().subscribe(
      data => {
        this.allDoctors = data;

        // Get all users, then remove non-doctors >:)
        for (var user in this.allDoctors) {
          if (this.allDoctors[user].account_type != 'doctor') {
            this.allDoctors.splice(parseInt(user), 1)
          }
        }
      }
    )
  }

  enforceBoundsAndCheckForError() {
    // Ensures that the date selection stays between today and 1 year from now
    if (this.selectedDate != "") {
      if (this.selectedDate > this.max) {
        this.selectedDate = this.max;
      }
      else if (this.selectedDate < this.min) {
        this.selectedDate = this.min;
      }
    }
  }

  updateApptTimeslots() {
    // Reset dr selection if prior one exists
    this.selectedDr = "";

    let formattedSelectDate = new Date(this.selectedDate).toLocaleDateString("en-SG",{weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})
    let formattedApptDate = new Date(this.selectedAppt).toLocaleDateString("en-SG",{weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})
    
    let disable = "";
    // Disabled weekend timeslots
    let dayChecker = new Date(this.selectedDate).getDay() // Get day of week in number form, 0 = Sunday, ..., 6 = Saturday
    let isSun = false;
    let isSat = false;

    switch (dayChecker) {
      case 0:
        isSun = true;
        isSat = false;
        break;

      case 6:
        isSun = false;
        isSat = true;
        break;

      default:
        isSun = false;
        isSat = false;
        break;
    }

    // Get list of appointments for selected date
    let apptCountPerTimeslot:{[key: number]: number} = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
      11: 0
    }

    for (var appt in this.allAppts) {
      // Format the current appt with GMT +8
      let apptDateWithGMT8 = new Date(
        new Date(this.allAppts[appt]['date_visited']).setHours(
          new Date(this.allAppts[appt]['date_visited']).getHours() + 8
        )
      ).toISOString().split('T')[0]
    
      if (apptDateWithGMT8 == this.selectedDate) {
        this.allApptsOnSelectedDate.push(this.allAppts[appt])
        apptCountPerTimeslot[this.allAppts[appt]['timeslot']]++;
      }
    }

    // Populate timeslot selection table row by row
    for (let timeslot in this.timeslots) {

      // Disabled rows that match weekend
      // If Sunday, disable all
      if (isSun) {
        disable = "disabled";
      }
      // If Saturday, disable timeslots past 12pm
      else if (isSat) {
        if (parseInt(timeslot) > 4) {
          disable = "disabled";
        }
      }
      // End weekend check

      // Check for existing appointments to block occupied timeslots
      // If this timeslot's appointments count = doctor count, disable
      if (apptCountPerTimeslot[timeslot] == this.allDoctors.length) {
        disable = "disabled";
      }

      // End existing appointment check

      this.appts[parseInt(timeslot)-1] = [this.timeslots[timeslot], formattedSelectDate, disable, timeslot];
      disable = "";

      // Clear out selectedAppt if date is changed so that submit button disappears
      if (formattedApptDate != formattedSelectDate) {
        this.selectedAppt = "";
      }
    }
  }

  updateDrAvailibility() {
    this.doctors = [];
    let doctorId = "";
    let doctorFullName = "";
    let doctorDisabled = "";

    // For every doctor that exists, check their state so we can provide the options to the user
    for (var doctor in this.allDoctors) {
      doctorId = this.allDoctors[doctor].user_id.toString();

      // Run through all appointments for selected date
      for (var appt in this.allApptsOnSelectedDate) {
        let currentAppt = this.allApptsOnSelectedDate[appt];
        let selectedApptTimeslot = parseInt(this.selectedAppt.split(',')[4])
        
        // If existing appointment matches current timeslot, store the doctors' state as disabled
        if (currentAppt.timeslot == selectedApptTimeslot) {
            doctorDisabled = currentAppt.doctor_id == this.allDoctors[doctor].user_id ? "disabled" : "";
        } // otherwise leave disabled as blank
      }     
      
      // Afterwards, add this doctor to row of doctors
      doctorFullName = this.allDoctors[doctor].first_name + " " + this.allDoctors[doctor].last_name
      this.doctors.push([doctorId, doctorFullName, doctorDisabled])

      // for loop wil repeat for all doctors :)
    }
  }

  makeAppt() {
    let appt = {
        "patient_id": JSON.parse(sessionStorage.getItem("loggedInUser")!).user_id,
        "doctor_id": parseInt(this.selectedDr),
        "date_visited": this.selectedDate,
        "timeslot": parseInt(this.selectedAppt.split(",")[4]),
        "diagnosis": this.description,
        "prescription": null
    };
    
    this.appointmentService.createAppt(appt).subscribe(
      data => {
        this.router.navigate(['patient/appointments/success'], {queryParams: appt});
      }
    )
  }
}
