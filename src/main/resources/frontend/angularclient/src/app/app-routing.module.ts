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
import { PatientAppointmentsComponent } from './patient-appointments/patient-appointments.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent, canActivate: [RouteGuardService]},
  {path: 'user-list', component: UserListComponent, canActivate: [RouteGuardService]},
  {path: 'user', component: PatientProfileComponent, canActivate: [RouteGuardService]},
  {path: 'user/appointments', component: PatientAppointmentsComponent, canActivate: [RouteGuardService]},
  {path: '**', component: ErrorComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
