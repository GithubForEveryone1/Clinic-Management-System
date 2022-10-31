import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../common/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private baseUrl = 'http://localhost:8080/api';

  constructor(private httpClient: HttpClient) { }

  getUserList(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseUrl}/user`);
  }

  createUser(user: any): Observable<User> {
    return this.httpClient.post<User>(`${this.baseUrl}/user/create`, user);
  }
  
  deleteUser(email: any) {
    return this.httpClient.delete(`${this.baseUrl}/user/delete`, {body: email});
  }