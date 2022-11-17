import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientProfileComponent } from './components/patient-profile/patient-profile.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { RegisterComponent } from './components/register/register.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { RouteGuardService } from './services/route-guard.service';
import { HomeComponent } from './components/home/home.component';
import { PatientAppointmentsComponent } from './components/patient-appointments/patient-appointments.component';
import { SuperAdminComponent } from './components/super-admin/super-admin.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { NurseComponent } from './components/nurse/nurse.component';
import { DoctorAppointmentsComponent } from './components/doctor-appointments/doctor-appointments.component';
import { PatientMakeAppointmentComponent } from './components/patient-make-appointment/patient-make-appointment.component';
import { PatientMakeAppointmentSuccessComponent } from './components/patient-make-appointment-success/patient-make-appointment-success.component';
import { PatientMakeAppointmentFailureComponent } from './components/patient-make-appointment-failure/patient-make-appointment-failure.component';
import { AllPatientsComponent } from './components/all-patients/all-patients.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent, canActivate: [RouteGuardService]},
  {path: 'user-list', component: UserListComponent, canActivate: [RouteGuardService]},
  {path: 'patient/appointments', component: PatientAppointmentsComponent, canActivate: [RouteGuardService]},
  {path: 'patient/appointments/new', component: PatientMakeAppointmentComponent, canActivate: [RouteGuardService]},
  {path: 'patient/appointments/success', component: PatientMakeAppointmentSuccessComponent, canActivate: [RouteGuardService]},
  {path: 'patient/appointments/failure', component: PatientMakeAppointmentFailureComponent, canActivate: [RouteGuardService]},
  {path: 'patient', component: PatientProfileComponent, canActivate: [RouteGuardService]},
  {path: 'admin', component: SuperAdminComponent, canActivate: [RouteGuardService]},
  {path: 'doctor', component: DoctorComponent, canActivate: [RouteGuardService]},
  {path: 'doctor/appointments', component: DoctorAppointmentsComponent, canActivate: [RouteGuardService]},
  {path: 'nurse', component: NurseComponent, canActivate: [RouteGuardService]},
  {path: 'all-patients', component: AllPatientsComponent, canActivate: [RouteGuardService]},
  {path: '**', component: ErrorComponent},
  {path: 'error', component: ErrorComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
