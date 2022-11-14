import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClosingService {

  private baseUrl = 'http://localhost:8080/api/closing/';

  constructor(private httpClient: HttpClient) { }
  
  getClosingDatesList(): Observable<object[]> {
		return this.httpClient.get<object[]>(`${this.baseUrl}`);
	}
  
}
