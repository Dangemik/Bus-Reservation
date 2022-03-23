import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  readonly serviceName = '/api/Email';

  constructor(private httpClient: HttpClient) { }

  public SendEmailWithTicket(pdfBlob, emailUser): Observable<void> {
    const formData = new FormData();
    formData.append('file', pdfBlob, 'Bilet autobusowy');
    formData.append('email', emailUser);
    return this.httpClient.post<void>(`${this.serviceName}`, formData, {
      headers: new HttpHeaders({'enctype': 'multipart/form-data'})});
  }
}
