import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DataTablesModule } from 'angular-datatables';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { ErrorComponent } from './components/error/error.component';
import { AuthenticationService } from './services/authentication.service';
import { LogoutComponent } from './components/logout/logout.component';
import { PatientProfileComponent } from './components/patient-profile/patient-profile.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { PatientAppointmentsComponent } from './components/patient-appointments/patient-appointments.component';
import { SuperAdminComponent } from './components/super-admin/super-admin.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { NurseComponent } from './components/nurse/nurse.component';
import { PatientMakeAppointmentComponent } from './components/patient-make-appointment/patient-make-appointment.component';
import { DoctorAppointmentsComponent } from './components/doctor-appointments/doctor-appointments.component';
import { PatientMakeAppointmentSuccessComponent } from './components/patient-make-appointment-success/patient-make-appointment-success.component';
import { PatientMakeAppointmentFailureComponent } from './components/patient-make-appointment-failure/patient-make-appointment-failure.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './components/modal/modal.component';
import { DocAddDiagnosisSuccessComponent } from './components/doc-add-diagnosis-success/doc-add-diagnosis-success.component';
import { DocAddDiagnosisFailureComponent } from './components/doc-add-diagnosis-failure/doc-add-diagnosis-failure.component';
import { AllPatientsComponent } from './components/all-patients/all-patients.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PatientHistoryComponent } from './components/patient-history/patient-history.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { NurseAddReqSuccessComponent } from './components/nurse-add-req-success/nurse-add-req-success.component';
import { DocViewReqComponent } from './components/doc-view-req/doc-view-req.component';
import { NurseViewReqComponent } from './components/nurse-view-req/nurse-view-req.component';


@NgModule({
	declarations: [
		AppComponent,
		UserListComponent,
		LoginComponent,
		ErrorComponent,
		LogoutComponent,
		PatientProfileComponent,
		NavbarComponent,
		RegisterComponent,
		HomeComponent,
		FooterComponent,
		PatientAppointmentsComponent,
		SuperAdminComponent,
		DoctorComponent,
		NurseComponent,
		DoctorAppointmentsComponent,
		PatientMakeAppointmentComponent,
		PatientMakeAppointmentSuccessComponent,
		PatientMakeAppointmentFailureComponent,
		AllPatientsComponent,
		ModalComponent,
		DocAddDiagnosisSuccessComponent,
		DocAddDiagnosisFailureComponent,
		ProfileComponent,
		PatientHistoryComponent,
  InventoryComponent,
  NurseAddReqSuccessComponent,
  DocViewReqComponent,
  NurseViewReqComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule,
		DataTablesModule,
		NgbModule
	],
	providers: [UserService],
	bootstrap: [AppComponent]
})
export class AppModule { }
