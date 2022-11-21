import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Closing } from '../common/closing';

@Injectable({
	providedIn: 'root'
})
export class ClosingService {

	private baseUrl = 'http://localhost:8080/api/closing/';

	constructor(private httpClient: HttpClient) { }

	getClosingDatesList(): Observable<Closing[]> {
		return this.httpClient.get<Closing[]>(`${this.baseUrl}`);
	}

	getClosingDate(closingDate: Closing): Observable<Closing> {
		return this.httpClient.post<Closing>(`${this.baseUrl}create`, closingDate);
	}
}
