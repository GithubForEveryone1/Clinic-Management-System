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

  ngAfterViewInit(): void {}

  //method to handle error response from userService.getDoctors()
  handleGetPatientsErrorResponse(error:HttpErrorResponse) {
    this.patientsErrorMsg = error.error.message;
  }

  //method to pass patient ID to view patient history component.
  // Remus: I didn't use this method for the history display but we might need it in future
  viewPatientHistory(thePatientId: number) {
    this.router.navigate(['patient-history'], {queryParams: {patientId: thePatientId} })
  }

  // Show overlay for patient history
  hideHistory = true;
  selectedPatient = {} as User;
  showOverlay(thePatient: User) {
    this.hideHistory = false;
    this.selectedPatient = thePatient;

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
}
