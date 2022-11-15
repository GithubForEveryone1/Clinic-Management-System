import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMakeAppointmentSuccessComponent } from './patient-make-appointment-success.component';

describe('PatientMakeAppointmentSuccessComponent', () => {
  let component: PatientMakeAppointmentSuccessComponent;
  let fixture: ComponentFixture<PatientMakeAppointmentSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientMakeAppointmentSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientMakeAppointmentSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
