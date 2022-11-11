import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { PatientAppointmentsComponent } from './patient-appointments/patient-appointments.component';
import { SuperAdminComponent } from './components/super-admin/super-admin.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { NurseComponent } from './components/nurse/nurse.component';
import { DoctorAppointmentsComponent } from './components/doctor-appointments/doctor-appointments.component';

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
    DoctorAppointmentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
