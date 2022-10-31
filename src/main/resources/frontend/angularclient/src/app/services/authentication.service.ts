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
    return sessionStorage.getItem("email") !== null;
  }

  logout() {
    sessionStorage.removeItem("firstName");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("gender");
  }
}