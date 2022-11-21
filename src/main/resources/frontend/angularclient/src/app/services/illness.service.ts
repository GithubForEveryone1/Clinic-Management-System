import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IllnessService {
	private baseUrl = 'http://localhost:8080/api/illness';

  constructor(private httpClient: HttpClient) { }

  // Pass in object for illness
  // "name": "illness_name"
  // easy game

	getIllnessList(): Observable<Object[]> {
		return this.httpClient.get<Object[]>(`${this.baseUrl}`);
	}

  addIllness(illness: any): Observable<Object> {
		return this.httpClient.post<Object>(`${this.baseUrl}/add`, illness);
	}

  deleteIllness(illness: any): Observable<Object> {
		return this.httpClient.delete<Object>(`${this.baseUrl}/delete`, illness);
	}
}
