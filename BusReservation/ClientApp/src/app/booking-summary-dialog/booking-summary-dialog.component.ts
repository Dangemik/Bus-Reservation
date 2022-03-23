import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import * as moment from 'moment';
import { EmailService } from '../shared/Service/email.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-booking-summary-dialog',
  templateUrl: './booking-summary-dialog.component.html',
  styleUrls: ['./booking-summary-dialog.component.css']
})
export class BookingSummaryDialogComponent implements OnInit {

  public totalPrice = 0;
  public ticketDate: string;
  public docTicket;
  public status: string;

  constructor(public dialogRef: MatDialogRef<BookingSummaryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private emailService: EmailService) { }

  ngOnInit() {
    this.generateTicketDate();
    this.setIsBought();
    this.data.selectedDiscountTickets.forEach(discount => {
      this.totalPrice += discount.numberSeats *
        (this.data.busRoute.price -
          (this.data.busRoute.price * discount.discount.percentageDiscount) /
          100);
    });

    this.generateAndSendPdf();
  }

  setIsBought(): void {
    if (this.data.isBought === true) {
      this.status = 'Zapłacone';
    } else if (this.data.isBought === false) {
      this.status = 'Zarezerwowane';
    }
  }

  generateTicketDate(): void {
    this.ticketDate = new Date().toLocaleString();
  }

  generateAndSendPdf() {
    this.docTicket = {
      info: {
        title: 'Bilet Autobusowy',
      },
      content: [
        {
          text: `Data: ${this.ticketDate}`,
          alignment: 'right'
        },
        {
          columns: [
            [
              {
                text: 'Dane osobiste',
                bold: true,
                fontSize: 24,
              },
              { text: 'Imię: ' + this.data.user.firstName },
              { text: 'Nazwisko: ' + this.data.user.surname },
              { text: 'Numer telefonu: ' + this.data.user.phone },
              { text: 'Email: ' + this.data.user.email }
            ],
            [
              {
                text: 'Dane przejadu',
                bold: true,
                fontSize: 24,
              },
              { text: 'Data: ' + moment(this.data.travelDate).format('MM.DD.YYYY') },
              { text: 'Z przystanku: ' + this.data.busRoute.fromStation },
              { text: 'Do przystanku: ' + this.data.busRoute.toStation },
              { text: 'Godzina: ' + this.data.busRoute.hour + ':' + this.data.busRoute.minute },
              { text: 'Przez przystanki: ' + this.data.busRoute.throughStations },
              { text: 'Liczba km: ' + this.data.busRoute.numberKm },
              { text: 'Cena: ' + this.data.busRoute.price },
              { text: 'Firma: ' + this.data.busRoute.bus.busCompany },
              { text: 'Numer autobusu: ' + this.data.busRoute.bus.busId },
            ]
          ],
          columnGap: 10
        },
        {
          columns: [
            [
              {
                text: 'Podsumowanie',
                bold: true,
                fontSize: 24,
              },
              { text: 'Zarezerwowane miejsca: ' + this.data.seats },
              {
                table: {
                  headerRows: 1,
                  widths: ['*', 'auto'],
                  body: [
                    ['Zniżka', 'Cena'],
                    ...this.data.selectedDiscountTickets.map(p =>
                      [p.discount.discountName + '(' + p.discount.percentageDiscount + ' %): ' + p.numberSeats,
                      (p.numberSeats *
                        (this.data.busRoute.price -
                          (this.data.busRoute.price * p.discount.percentageDiscount) /
                          100)).toFixed(2)]),
                    [{ text: 'Cena całkowita:', colSpan: 1,  bold: true }, { text: this.totalPrice.toFixed(2), bold: true }]
                  ]
                },
                layout: 'noBorders',
              },
              {text: ' '},
              {
                text: 'Status: ' + this.status,
                bold: true,
                fontSize: 24,
              },
            ],
            []
          ],
          columnGap: 10
        },
        {
          qr: this.data.ticketNumber.toString(), fit: '200', absolutePosition: { x: 350, y: 600 }
        }
      ],
      defaultStyle: {
        fontSize: 15,
      }
    };
    pdfMake.createPdf(this.docTicket).getBlob((pdfBlob) => {
      this.emailService.SendEmailWithTicket(pdfBlob, this.data.user.email).subscribe();
    });
  }

  openPDF() {
    pdfMake.createPdf(this.docTicket).open();
  }

}
