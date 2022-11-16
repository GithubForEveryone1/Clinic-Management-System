import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/common/appointment';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';
import { HttpErrorResponse, HttpClient, HttpResponse } from '@angular/common/http';

// class DataTablesResponse {
//   data: any[];
//   draw: number;
//   recordsFiltered: number;
//   recordsTotal: number;
// }

@Component({
  selector: 'app-doctor-appointments',
  templateUrl: './doctor-appointments.component.html',
  styleUrls: ['./doctor-appointments.component.css']
})
export class DoctorAppointmentsComponent implements OnInit {

  // dtOptions: DataTables.Settings = {};

  loggedInUserStr: string | null = sessionStorage.getItem("loggedInUser");

  //parse JSON back to User object
  loggedInUser = this.loggedInUserStr ? JSON.parse(this.loggedInUserStr) : null;

  doctorId = this.loggedInUser.user_id;
 
  //Appointments
  appts: Appointment[] = [];

  //Error message from backend server
  errorMsg = "";

  constructor(private router: Router, private appointmentService: AppointmentService, private route: ActivatedRoute, private http:HttpClient) { }

   ngOnInit(): void {
     this.appointmentService.getApptsByDoctorId(this.doctorId).subscribe(
       data => {
         this.appts = data;
         console.log(this.appts);
       
       },
       error => this.handleErrorResponse(error),
     );
   }
  // ngOnInit(): void {
  //   const that = this;

  //   this.dtOptions = {
  //     pagingType: 'full_numbers',
  //     pageLength: 2,
  //     serverSide: true,
  //     processing: true,
  //     ajax: (dataTablesParameters: any, callback) => {
  //       that.http
  //         .post<DataTablesResponse>(
  //           'https://xtlncifojk.eu07.qoddiapp.com/',
  //           dataTablesParameters, {}
  //         ).subscribe(resp => {
  //           that.persons = resp.data;

  //           callback({
  //             recordsTotal: resp.recordsTotal,
  //             recordsFiltered: resp.recordsFiltered,
  //             data: []
  //           });
  //         });
  //     },
  //     columns: [{ data: 'id' }, { data: 'firstName' }, { data: 'lastName' }]
  //   };
  // }
  
  handleErrorResponse(error:HttpErrorResponse) {
    this.errorMsg = error.error.message;
  }

}
