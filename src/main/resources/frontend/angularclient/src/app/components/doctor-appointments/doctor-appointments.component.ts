import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Appointment } from 'src/app/common/appointment';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';

//so that jquery can work
declare const $:any;

@Component({
  selector: 'app-doctor-appointments',
  templateUrl: './doctor-appointments.component.html',
  styleUrls: ['./doctor-appointments.component.css']
})
export class DoctorAppointmentsComponent implements OnInit,AfterViewInit {

  loggedInUserStr: string | null = sessionStorage.getItem("loggedInUser");

  //parse JSON back to User object
  loggedInUser = this.loggedInUserStr ? JSON.parse(this.loggedInUserStr) : null;

  doctorId = this.loggedInUser.user_id;
 
  //Appointments
  appts: Appointment[] = [];

  //Error message from backend server
  errorMsg = "";

  constructor(private router: Router, private appointmentService: AppointmentService, private route: ActivatedRoute) { }

   ngOnInit(): void {

      this.appointmentService.getApptsByDoctorId(this.doctorId).subscribe(
        data => {
          this.appts = data;
          $(function(){
              $("#docAppt").DataTable();
           });
          // this.dtTrigger.next();
          console.log(this.appts);
        
        },
        error => this.handleErrorResponse(error),
        
      );
      
    }

    ngAfterViewInit(): void {
      
    }

  handleErrorResponse(error:HttpErrorResponse) {
    this.errorMsg = error.error.message;
  }

}
