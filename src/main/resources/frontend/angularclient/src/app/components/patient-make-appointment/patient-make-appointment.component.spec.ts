import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMakeAppointmentComponent } from './patient-make-appointment.component';

describe('PatientMakeAppointmentComponent', () => {
  let component: PatientMakeAppointmentComponent;
  let fixture: ComponentFixture<PatientMakeAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientMakeAppointmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientMakeAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
