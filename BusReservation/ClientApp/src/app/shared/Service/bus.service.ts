import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bus } from '../Model/Bus';


@Injectable({
  providedIn: 'root'
})
export class BusService {

  readonly serviceName = '/api/Bus';

  constructor(private httpClient: HttpClient) { }

  public GetBuses(): Observable<Bus[]> {
    return this.httpClient.get<Bus[]>(`${this.serviceName}`);
  }

  public AddBus(bus: Bus): Observable<void> {
    return this.httpClient.post<void>(`${this.serviceName}`, bus);
  }
  public UpdateBus(bus: Bus): Observable<void> {
    return this.httpClient.put<void>(`${this.serviceName}`, bus);
  }
  public DeleteBus(busId: number ): Observable<void> {
    return this.httpClient.delete<void>(`${this.serviceName}/${busId}`);
  }
}
