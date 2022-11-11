import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patient-make-appointment-success',
  templateUrl: './patient-make-appointment-success.component.html',
  styleUrls: ['./patient-make-appointment-success.component.css']
})
export class PatientMakeAppointmentSuccessComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  apptDetails: any[] = [];

  ngOnInit(): void {
		this.route.queryParams.subscribe(params => {
      let counter = 0;
      for (var key in params) {
        this.apptDetails.push(
          Object.keys(params)[counter++] + ": " + params[key]
          )
      }
		});
  }

}
