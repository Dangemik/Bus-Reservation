import { Injectable, EventEmitter } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';  
import { Seats } from '../Model/Seats';

@Injectable()
export class SeatsService {
  occupiedSeats  = new EventEmitter<Seats>();
  connectionEstablished = new EventEmitter<Boolean>();
  
  private connectionIsEstablished = false;
  private _hubConnection: HubConnection;

  constructor() {
    this.createConnection();
    this.registerOnServerEvents();
    this.startConnection();
   }

   refreshSeats(seats: Seats) {  
    this._hubConnection.invoke('RefreshSeats', seats);  
  }  

   private createConnection() {  
    this._hubConnection = new HubConnectionBuilder()
      .withUrl(window.location.href + 'SeatsHub')
      .build();  
  } 

  private startConnection(): void {  
    this._hubConnection
      .start()
      .then(() => {
        this.connectionIsEstablished = true;
        console.log('Hub connection started');
        this.connectionEstablished.emit(true);
      })
      .catch(err => {
        console.log('Error while establishing connection, retrying...');
        setTimeout(function () { this.startConnection(); }, 5000);
      });  
  }  

  private registerOnServerEvents(): void {  
    this._hubConnection.on('OccupiedSeats', (data: any) => {  
      this.occupiedSeats.emit(data);  
    });  
  }

}
