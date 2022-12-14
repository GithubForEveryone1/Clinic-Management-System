import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Request } from '../common/request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private httpClient: HttpClient) { }

  addRequest(request: any): Observable<Request>{
    return this.httpClient.post<Request>(`${this.baseUrl}/request/create`, request);
  }

  viewRequests(): Observable<Request[]>{
    return this.httpClient.get<Request[]>(`${this.baseUrl}/requests`);
  }

  approveRequest(request: any): Observable<Request>{
    return this.httpClient.put<Request>(`${this.baseUrl}/request/approve`, request);
  }

  rejectRequest(request: any): Observable<Request>{
    return this.httpClient.put<Request>(`${this.baseUrl}/request/reject`, request);
  }

  getRequestByNurseId(nurseId: number): Observable<Request[]>{
    return this.httpClient.get<Request[]>(`${this.baseUrl}/request/` + nurseId);
  }
}
