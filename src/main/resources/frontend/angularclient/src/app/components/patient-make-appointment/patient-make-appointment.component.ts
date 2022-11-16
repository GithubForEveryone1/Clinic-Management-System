import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/common/user';
import { Appointment } from 'src/app/common/appointment';
import { AppointmentService } from 'src/app/services/appointment.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ClosingService } from 'src/app/services/closing.service';

@Component({
  selector: 'app-patient-make-appointment',
  templateUrl: './patient-make-appointment.component.html',
  styleUrls: ['./patient-make-appointment.component.css']
})
export class PatientMakeAppointmentComponent implements OnInit {
  
  // Set max / min for the date selection
  max = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]; // Set max valid date = 1 year from today
  min = new Date().toISOString().split('T')[0];                                                     // Set min valid date = today

  // Data from the backend, populated during ngOnInit()
  // allAppts: Appointment[] = []; // Every single appt in our DB
  allDoctors: User[] = [];      // Every single doctor in our DB

  // Processed versions of appts and doctors to be used for populating the timeslot and doctor selection tables
  appts:string[][] = [];
  doctors:string[][] = [];

  allApptsOnSelectedDate: Appointment[] = []; // All appointments that fall on the date selected by the user

  // These are binded to the input fields to get the user's selections
  dropdown = "What would you like to see the doctor for?";       // The dropdown for common ailments selection
  description = "";    // The description provided by the user in the textarea
  selectedDate = "";   // The date that the user has picked
 
  selectedAppt = "";   // The timeslot radio button that user has selected
  selectedDr = "";     // The doctor radio button that user has selected

  // Hardcode 11 timeslots that the clinic will use
  // Yes I like to hardcode stuff, what are you gonna do about it?
  timeslots: {[key: number]: string[]} = {
    1:  ['8:00 AM', '08:00:00'],
    2:  ['9:00 AM', '09:00:00'],
    3:  ['10:00 AM','10:00:00'],
    4:  ['11:00 AM','11:00:00'],
    5:  ['1:00 PM', '13:00:00'],
    6:  ['2:00 PM', '14:00:00'],
    7:  ['3:00 PM', '15:00:00'],
    8:  ['4:00 PM', '16:00:00'],
    9:  ['6:00 PM', '18:00:00'],
    10: ['7:00 PM', '19:00:00'],
    11: ['8:00 PM', '20:00:00']
  }

  constructor(private appointmentService: AppointmentService, private userService: UserService, private closingService: ClosingService, private router: Router) { }

  ngOnInit(): void {
    // Get all doctors from DB
    this.userService.getDoctors().subscribe(
      data => {
        this.allDoctors = data;
      }
    )
  }

  // Called on datepicker (change)
  // Prevents user from manually entering a date, or selecting an invalid date from the datepicker
  enforceBoundsAndCheckForError() {
    // Overwrite date selection to stay between today and 1 year from now
    if (this.selectedDate != "") {
      if (this.selectedDate > this.max) {
        this.selectedDate = this.max;
      }
      else if (this.selectedDate < this.min) {
        this.selectedDate = this.min;
      }
    }
  }

  // Called on datepicker (change)
  // Creates the rows for timeslots for appointments
  updateApptTimeslots() {
    this.selectedDr = "";   // Clear out doctor selection if prior one already exists
    this.selectedAppt = ""; // Clear out selected timeslot if prior one already exists

    // Format user's selected date to nice format for displaying in rows
    // Format the selected timeslot's date so that we can check if user has changed the date selection, otherwise the timeslot selection will
    let formattedSelectDate = new Date(this.selectedDate).toLocaleDateString("en-SG",{weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})
    // let formattedApptDate = new Date(this.selectedAppt).toLocaleDateString("en-SG",{weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})
    
    let disable = ""; // "disabled" if slots full, "disabled-by-conflict" if user already has appointment on that day

    // Stores variable to check which timeslots to disable
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

    // Check closing dates table to see if clinic is closed
    let closedToday = false;

    this.closingService.getClosingDatesList().subscribe(
      data => {
        for (let closingDate in data) {
          let tempDate = new Date(new Date(Object.values(data[closingDate])[0]).toLocaleDateString());
          let selectedDate = new Date(new Date(this.selectedDate).toLocaleDateString());
          if (selectedDate.valueOf() == tempDate.valueOf()) {
            closedToday = true;
          }
        }
      })
    

    /* 
    Get list of appointments for selected date
    format is:
    timeslot: [total count of appts for this slot, does user have appt on this slot (0 / 1)]
    */
    let apptCountPerTimeslot:{[key: number]: number[]} = {
      1: [0, 0],
      2: [0, 0],
      3: [0, 0],
      4: [0, 0],
      5: [0, 0],
      6: [0, 0],
      7: [0, 0],
      8: [0, 0],
      9: [0, 0],
      10: [0, 0],
      11: [0, 0]
    }
    
    this.appointmentService.getApptsByDate(this.selectedDate).subscribe(
      data => {
        this.allApptsOnSelectedDate = data;
      },
      error => {
        this.allApptsOnSelectedDate = [];
      }).add(
      () => {
        // Populate apptCountPerTimeslot
        // timeslot: [total count of appts for this slot, does user have appt on this slot (0 / 1)]
        for (let appt of this.allApptsOnSelectedDate) {
          apptCountPerTimeslot[appt.timeslot][0]++;

          if (appt.patient_id == JSON.parse(sessionStorage.getItem("loggedInUser")!).user_id) {
            apptCountPerTimeslot[appt.timeslot][1] = 1;
          } 
        }

        // Populate timeslot selection table row by row [Timeslots numbers go from 1 to 11]
        for (let timeslot in this.timeslots) {
  
          // Disable this timeslot row if it's a weekend
          // Sunday or closed        = disable all
          // Timeslot already passed = disable timeslots since you can't go back in time
          // Saturday                = disable timeslots past 12pm
          
          const timeslotTime = new Date(this.selectedDate + 'T' + this.timeslots[timeslot][1]); // In ISO format
          
          if (isSun || closedToday) {
            disable = "disabled";
          }
          else if (new Date() > timeslotTime) {
            disable = "disabled"
          }
          else if (isSat) {
            if (parseInt(timeslot) > 4) {
              disable = "disabled";
            }
          }
  
          // Check for other existing appointments to block occupied timeslots
          // If this timeslot's appointments count = doctor count, disable it
          if (apptCountPerTimeslot[timeslot][0] == this.allDoctors.length) {
            disable = "disabled";
          }
  
          // Check if user already has an appointment on the timeslot
          // Pull the 0 / 1 from the appointment counter array stored previously
          if (apptCountPerTimeslot[timeslot][1] == 1) {
            disable = "disabled-by-conflict";
          }
  
  
          /*
          Store this timeslot into the appts array for front end to display
          Format:
          appt = [
            timeslot timing (8:00 AM),
            date (Friday, 11 November 2022),
            "disabled" if disabled else "", 
            "yes" if user has appointment else "no"
          ]
          */
          this.appts[parseInt(timeslot)-1] = [this.timeslots[timeslot][0], formattedSelectDate, disable, timeslot];
          disable = ""; // Reset disable for next row loop
        }
      }
    );
  }

  updateDrAvailibility() {
    this.doctors = []; // Store doctors to show in doctor table

    // For every doctor that exists, check their state so we can provide the options to the user
    // This disables doctors that are not free for consultation on a specific timeslot
    for (var doctor in this.allDoctors) {
      console.log(doctor);
      let doctorId = this.allDoctors[doctor].user_id.toString(); // Get doctor ID
      let doctorDisabled = "";
      
      // Run through all appointments for selected date
      for (var appt in this.allApptsOnSelectedDate) {
        let currentAppt = this.allApptsOnSelectedDate[appt];                 // Get appointment in current loop
        let selectedApptTimeslot = parseInt(this.selectedAppt.split(',')[4]) // Get the timeslot number
        
        // If existing appointment timeslot number matches current timeslot number and
        // the doctor for this appointment is the doctor in our current loop then
        // Store the doctors' state as disabled
        if (currentAppt.timeslot == selectedApptTimeslot) {
            doctorDisabled = currentAppt.doctor_id == this.allDoctors[doctor].user_id ? "disabled" : "";
        }
      }     
      
      // Afterwards, add this doctor to row of doctors
      let doctorFullName = this.allDoctors[doctor].first_name + " " + this.allDoctors[doctor].last_name
      this.doctors.push([doctorId, doctorFullName, doctorDisabled])
    }
  }

  makeAppt() {
    let timeslotNumber = parseInt(this.selectedAppt.split(",")[4]);
    let patientId = JSON.parse(sessionStorage.getItem("loggedInUser")!).user_id;
    let doctorId = parseInt(this.selectedDr.split(':')[0]);
    let doctorName = this.selectedDr.split(':')[1];

    // This is POSTed to the backend
    let appt = {
      "patient_id": patientId,
      "doctor_id": doctorId,
      "date_visited": this.selectedDate,
      "timeslot": timeslotNumber,
      "diagnosis": this.description ? this.description : this.dropdown,
      "prescription": null
    };
    
    // This is sent to display on the success page
    let query = {
      "Consultation with": "Dr. " + doctorName,
      "Date": this.timeslots[timeslotNumber][0] + ", " + new Date(this.selectedDate).toLocaleDateString("en-SG",{weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}),
    }

    this.appointmentService.createAppt(appt).subscribe(
      data => {
        this.router.navigate(['patient/appointments/success'], {queryParams: query});
      },
      error => {
        this.router.navigate(['patient/appointments/failure']);
      }
    )
  }
}
