import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMakeAppointmentFailureComponent } from './patient-make-appointment-failure.component';

describe('PatientMakeAppointmentFailureComponent', () => {
  let component: PatientMakeAppointmentFailureComponent;
  let fixture: ComponentFixture<PatientMakeAppointmentFailureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientMakeAppointmentFailureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientMakeAppointmentFailureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
