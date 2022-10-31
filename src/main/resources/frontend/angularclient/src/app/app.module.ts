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
import { DummyComponent } from './components/dummy/dummy.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    LoginComponent,
    ErrorComponent,
    LogoutComponent,
    DummyComponent,
    HomeComponent
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
