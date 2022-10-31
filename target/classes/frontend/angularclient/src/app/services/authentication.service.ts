import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../common/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseUrl = "http://localhost:8080/api";

  constructor(private httpClient: HttpClient) { }

  authenticate(user:User): Observable<User> {
    return this.httpClient.post<User>(`${this.baseUrl}/users/login`, user);
    
    /*
    if(email==="test@email.com" && password==="test") {
      sessionStorage.setItem("authenticatedUser", email)
      return true;
    }
    return false;
    */
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('authenticatedUser');
    return !(user === null);
  }

}
