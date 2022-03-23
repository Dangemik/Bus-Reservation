import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from '../Model/Ticket';
import { TicketDTO } from '../Model/TicketDTO';
import { TicketResponse } from '../Model/TicketResponse';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  readonly serviceName = '/api/Ticket';

  constructor(private httpClient: HttpClient) { }

  public GetTickets(): Observable<TicketResponse[]> {
    return this.httpClient.get<TicketResponse[]>(`${this.serviceName}`);
  }
  public AddTicket(tickets: TicketDTO): Observable<number> {
    return this.httpClient.post<number>(`${this.serviceName}`, tickets);
  }

  public SearchOccupiedSeats(busRouteId: number, travelDate: Date): Observable<number[]> {
    const options = busRouteId && travelDate ?
      { params: new HttpParams().set('busRouteId', busRouteId.toString()).set('travelDate', travelDate.toDateString()) } : {};
    return this.httpClient.get<number[]>(`${this.serviceName}/GetAllOccupiedSeats`, options);
  }

}
