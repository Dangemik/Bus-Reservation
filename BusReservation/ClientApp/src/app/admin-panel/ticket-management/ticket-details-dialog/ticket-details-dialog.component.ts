import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-ticket-details-dialog',
  templateUrl: './ticket-details-dialog.component.html',
  styleUrls: ['./ticket-details-dialog.component.css']
})
export class TicketDetailsDialogComponent implements OnInit {

  public totalPrice = 0;
  public status: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.setIsBought();
    this.data.selectedDiscountTickets.forEach(discount => {
      this.totalPrice += discount.numberSeats *
        (this.data.busRoute.price -
          (this.data.busRoute.price * discount.discount.percentageDiscount) /
          100);
    });
  }

  setIsBought(): void {
    if (this.data.isBought === true) {
      this.status = 'Zapłacone';
    } else if (this.data.isBought === false) {
      this.status = 'Zarezerwowane';
    }
  }

}
