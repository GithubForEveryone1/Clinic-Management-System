import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from '../../common/appointment';
import { AppointmentService } from '../../services/appointment.service';


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
        for (let appt in data) {
          let currentAppt = data[appt];
          let localizedDate = new Date(data[appt].date_visited).toLocaleDateString();
          
          currentAppt.date_visited = localizedDate;
          this.appts.push(currentAppt);
        }
        this.filterAndSortForPastAppts();
        this.filterAndSortForUpcomingAppts();
        console.log(this.todayDate);
        console.log(Date.parse("2022-11-08T00:00:00.000+00:00"));
        console.log(new Date("2022-11-08T00:00:00.000+00:00").getDay());
        console.log(new Date("2022-11-08T00:00:00.000+00:00").toISOString());
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

  //create a method to read time for timeslot
  readTimeslot(slot: number):number {
    switch(slot) {
      case 1: {
        return 8;
      }
      case 2: {
        return 9;
      }
      case 3: {
        return 10;
      }
      case 4: {
        return 11;
      }
      case 5: {
        return 13;
      }
      case 6: {
        return 14;
      }
      case 7: {
        return 15;
      }
      case 8: {
        return 16;
      }
      case 9: {
        return 18;
      }
      case 10: {
        return 19;
      }
      case 11: {
        return 20;
      }
      default: {
        return NaN
      }
    }
  }

  sortByDateCompareFn(a: Appointment, b: Appointment) {// cant sort down to hours.... work in progress....
    //if ( Date.parse(a.date_visited) < Date.parse(b.date_visited) ){
    if ((new Date(a.date_visited).setHours(this.readTimeslot(a.timeslot))) < (new Date(b.date_visited).setHours(this.readTimeslot(b.timeslot)))) {
      return -1;
    }
    //if ( Date.parse(a.date_visited) > Date.parse(b.date_visited) ){
    if ((new Date(a.date_visited).setHours(this.readTimeslot(a.timeslot))) > (new Date(b.date_visited).setHours(this.readTimeslot(b.timeslot)))) {
      return 1;
    }
    return 0;
  }

  filterAndSortForPastAppts() {
    //console.log(this.readTimeslot(1));
    this.appts.forEach((value) => {
      //const apptDate = Date.parse(value.date_visited);
      const apptDate = new Date(value.date_visited).setHours(this.readTimeslot(value.timeslot));
      console.log(apptDate);
      if (apptDate < this.todayDate) {
        this.pastAppts.push(value);
      }
    });
    this.pastAppts.sort(this.sortByDateCompareFn);
  }

  filterAndSortForUpcomingAppts() {
    this.appts.forEach((value) => {
      //const apptDate = Date.parse(value.date_visited);
      const apptDate = new Date(value.date_visited).setHours(this.readTimeslot(value.timeslot));
      console.log(apptDate);
      if (apptDate >= this.todayDate) {
        this.upcomingAppts.push(value);
      }
    });
    this.upcomingAppts.sort(this.sortByDateCompareFn);
  }

  initialiseDate(strDate: string): Date {
    return new Date(strDate);
  }

  displayDay(day: number):string {
    switch(day) {
      case 0: {
        return "SUN";
      }
      case 1: {
        return "MON";
      }
      case 2: {
        return "TUE";
      }
      case 3: {
        return "WED";
      }
      case 4: {
        return "THU";
      }
      case 5: {
        return "FRI";
      }
      case 6: {
        return "SAT";
      }
      default: {
        return "ERROR"
      }
    }
  }

  displayTimeslot(slot: number):string {
    switch(slot) {
      case 1: {
        return "08:00 AM";
      }
      case 2: {
        return "09:00 AM";
      }
      case 3: {
        return "10:00 AM";
      }
      case 4: {
        return "11:00 AM";
      }
      case 5: {
        return "01:00 PM";
      }
      case 6: {
        return "02:00 PM";
      }
      case 7: {
        return "03:00 PM";
      }
      case 8: {
        return "04:00 PM";
      }
      case 9: {
        return "06:00 PM";
      }
      case 10: {
        return "07:00 PM";
      }
      case 11: {
        return "08:00 PM";
      }
      default: {
        return "ERROR"
      }
    }
  }
}


