import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BusRoute } from '../Model/BusRoute';

@Injectable({
  providedIn: 'root'
})
export class BusRouteService {

  readonly serviceName = '/api/BusRoute';

  constructor(private httpClient: HttpClient) { }

  public GetBusRoutes(): Observable<BusRoute[]> {
    return this.httpClient.get<BusRoute[]>(`${this.serviceName}`);
  }
  public AddBusRoute(busRoute: BusRoute): Observable<void> {
    return this.httpClient.post<void>(`${this.serviceName}`, busRoute);
  }
  public UpdateBusRoute(busRoute: BusRoute): Observable<void> {
    return this.httpClient.put<void>(`${this.serviceName}`, busRoute);
  }
  public DeleteBusRoute(busId: number ): Observable<void> {
    return this.httpClient.delete<void>(`${this.serviceName}/${busId}`);
  }

}
