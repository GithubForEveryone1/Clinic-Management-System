import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patient-make-appointment-success',
  templateUrl: './patient-make-appointment-success.component.html',
  styleUrls: ['./patient-make-appointment-success.component.css']
})
export class PatientMakeAppointmentSuccessComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  apptDetails = {};

  ngOnInit(): void {
		this.route.queryParams.subscribe(params => {
      this.apptDetails = params;
      });
  }
}
