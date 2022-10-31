import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { RouteGuardService } from './services/route-guard.service';

// welcome
const routes: Routes = [
  { path:"", component: LoginComponent },
  { path:"login", component: LoginComponent },
  { path:"user-list", component: UserListComponent, canActivate:[RouteGuardService] }, //implements CanActivate,RouteGuardService
  { path:"**", component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
