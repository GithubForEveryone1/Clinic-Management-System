import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inventory } from '../common/inventory';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private httpClient: HttpClient) { }

  getInventoryList(): Observable<Inventory[]>{
    return this.httpClient.get<Inventory[]>(`${this.baseUrl}/inventory`);
  }
}
