import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../common/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  private baseUrl = 'http://localhost:8080/api';

  constructor(private httpClient: HttpClient) { }

  authenticateUser(user: any): Observable<User> {
    return this.httpClient.post<User>(`${this.baseUrl}/user/login`, user);
  }

  isUserLoggedIn(): boolean {
    //return sessionStorage.getItem("email") !== null;
    return sessionStorage.getItem("loggedInUser") !== null;
  }
    
  isUserSuperAdmin(): boolean {
	const account_type = sessionStorage.getItem("type");
    if(account_type == "admin") {
      return sessionStorage.getItem("type") !== null;	
    } else {
      return false;
    }
  }

  isUserDoctor(): boolean {
    const account_type = sessionStorage.getItem("type");

    if(account_type == "doctor") {
      return sessionStorage.getItem("type") !== null;	
    } else {
      return false;
    }
  }

  isUserPatient(): boolean {
    const account_type = sessionStorage.getItem("type");

    if(account_type == "patient") {
      return sessionStorage.getItem("type") !== null;	
    } else {
      return false;
    }
  }
  
  isUserNurse(): boolean {
    const account_type = sessionStorage.getItem("type");

    if(account_type == "nurse") {
      return sessionStorage.getItem("type") !== null;	
    } else {
      return false;
    }
  }

  logout() {
    //sessionStorage.removeItem("firstName");
    //sessionStorage.removeItem("email");
    //sessionStorage.removeItem("gender");
    sessionStorage.removeItem("loggedInUser");
  }
}