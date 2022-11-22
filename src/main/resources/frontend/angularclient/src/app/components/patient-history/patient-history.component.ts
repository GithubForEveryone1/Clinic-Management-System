import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Appointment } from 'src/app/common/appointment';
import { User } from 'src/app/common/user';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-patient-history',
  templateUrl: './patient-history.component.html',
  styleUrls: ['./patient-history.component.css']
})
export class PatientHistoryComponent implements OnInit, OnChanges {

  @Input() selectedPatient = {} as User;
  appts: Appointment[] = [];
  noApptFound = false;

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.appts = [];
    this.noApptFound = false;

    // Destroy previous table
    $(function(){
      $("#patientAppts").DataTable().clear().destroy();
    });

    this.appointmentService.getApptsByUserId(this.selectedPatient.user_id).subscribe(
      data => {
        console.log(data);
        this.appts = data;
        
        // Create datatable only if data exists
        $(function(){
          $("#patientAppts").DataTable();
        });
      },
      error => {
        console.log(error);
        this.noApptFound = true;
      }  
    );
  }  

}
