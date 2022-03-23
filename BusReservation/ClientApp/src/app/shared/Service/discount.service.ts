import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Discount } from '../Model/Discount';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  readonly serviceName = '/api/Discount';

  constructor(private httpClient: HttpClient) { }

  public GetDiscounts(): Observable<Discount[]> {
    return this.httpClient.get<Discount[]>(`${this.serviceName}`);
  }

  public AddDiscount(discount: Discount): Observable<void> {
    return this.httpClient.post<void>(`${this.serviceName}`, discount);
  }

  public UpdateDiscount(discount: Discount): Observable<void> {
    return this.httpClient.put<void>(`${this.serviceName}`, discount);
  }

  public DeleteDiscount(discountId: number ): Observable<void> {
    return this.httpClient.delete<void>(`${this.serviceName}/${discountId}`);
  }
}
