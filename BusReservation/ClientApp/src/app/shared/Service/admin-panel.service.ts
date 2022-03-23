import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bus } from '../Model/Bus';

@Injectable({
  providedIn: 'root'
})
export class AdminPanelService {

  readonly serviceName = "/api/AdminPanel"

  constructor(private httpClient: HttpClient) { }

  // Buses
  GetBuses(): Observable<Bus[]> {
    return this.httpClient.get<Bus[]>(`${this.serviceName}/GetBuses`);
  }
  public AddBus(bus: Bus): Observable<Bus> {
    return this.httpClient.post<Bus>(`${this.serviceName}/AddBus`, bus);
  }



}
