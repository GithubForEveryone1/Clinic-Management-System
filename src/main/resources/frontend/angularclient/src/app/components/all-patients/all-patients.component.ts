import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/common/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-all-patients',
  templateUrl: './all-patients.component.html',
  styleUrls: ['./all-patients.component.css']
})
export class AllPatientsComponent implements OnInit,AfterViewInit {

  //Patients
  patients: User[] = [];
  patientsErrorMsg = "";

  constructor(private router: Router, private userService: UserService) { }
  
  

  ngOnInit(): void {

    this.userService.getPatients().subscribe(
      data => {
        this.patients = data;
        $(function() {
          $("#example").DataTable();
        });
      },
      error => this.handleGetPatientsErrorResponse(error),
    );


  }

  ngAfterViewInit(): void {

  }

  //method to handle error response from userService.getDoctors()
  handleGetPatientsErrorResponse(error:HttpErrorResponse) {
    this.patientsErrorMsg = error.error.message;
  }

  //method to pass patient ID to view patient history component.
  viewPatientHistory(thePatientId: number) {
    this.router.navigate(['patient-history'], {queryParams: {patientId: thePatientId} })
  }

}
