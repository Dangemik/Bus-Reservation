import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly serviceName = '/api/User';

  constructor(private httpClient: HttpClient) { }

  public GetUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.serviceName}`);
  }
  public GetDrivers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.serviceName}/divers`);
  }
  public AddUser(user: User): Observable<void> {
    return this.httpClient.post<void>(`${this.serviceName}`, user);
  }
  public UpdateUser(user: User): Observable<void> {
    return this.httpClient.put<void>(`${this.serviceName}`, user);
  }
  public DeleteUser(userId: number ): Observable<void> {
    return this.httpClient.delete<void>(`${this.serviceName}/${userId}`);
  }

}
