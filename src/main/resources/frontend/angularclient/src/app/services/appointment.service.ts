import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from '../common/appointment';
import { User } from '../common/user';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private httpClient: HttpClient) { }

	getApptsList(): Observable<Appointment[]> {
		return this.httpClient.get<Appointment[]>(`${this.baseUrl}/appt`);
	}

  getApptsByUserId(userId: number): Observable<Appointment[]> {
    return this.httpClient.get<Appointment[]>(`${this.baseUrl}/appt/` + userId);
  }

  createAppt(appointment: any): Observable<Appointment> {
		return this.httpClient.post<Appointment>(`${this.baseUrl}/appt/create`, appointment);
	}

}
