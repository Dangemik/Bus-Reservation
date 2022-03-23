import { Component, OnInit, Inject, ViewChild, setTestabilityGetter, NgZone } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BusRoute } from '../shared/Model/BusRoute';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../shared/Model/User';
import { TicketDTO } from '../shared/Model/TicketDTO';
import { Discount } from '../shared/Model/Discount';
import { DiscountKeyValues } from '../shared/Model/DiscountKeyValues';
import Swal from 'sweetalert2';
import { Seats } from '../shared/Model/Seats';
import { SeatsService } from '../shared/Service/seats.service';
import { DatePipe } from '@angular/common';
import { TicketService } from '../shared/Service/ticket.service';
import { PaymentDialogComponent } from './payment-dialog/payment-dialog.component';
import { DiscountService } from '../shared/Service/discount.service';


@Component({
  selector: 'app-reservation-dialog',
  templateUrl: './reservation-dialog.component.html',
  styleUrls: ['./reservation-dialog.component.css']
})
export class ReservationDialogComponent implements OnInit {

  public busRoute: BusRoute;
  public user: User;

  // Seats 
  public seatsArray: number[];
  public bookedSeats: number[] = [];

  //Stepper
  isLinear = true;
  // Route
  routeForm = new FormGroup({
    busRouteId: new FormControl('0', Validators.required),
  });
  // User
  userForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.pattern('[0-9]{9}')]),
    email: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z0-9.-]{2,}[.]{1}[a-zA-Z]{2,}')]),
  });

  // Discount
  public discounts: Discount[];
  numberSelectedTickets: number = 0;

  selectedDiscountTickets: DiscountKeyValues[];
  selectedDiscountTicketsList: Array<DiscountKeyValues>;

  // Table
  displayedColumns: string[] = ['fromStation', 'toStation', 'time', 'throughStations',
    'numberKm', 'price', 'busCompany', 'busId', 'actions'];
  public dataSource: MatTableDataSource<BusRoute>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  // SignalR
  occupiedSeats: number[] = [];
  routeId: number = 12;
  seats = new Seats();

  constructor(public dialogRef: MatDialogRef<ReservationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private discountService: DiscountService,
    private ticketService: TicketService,
    private seatsService: SeatsService,
    public datepipe: DatePipe,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.showOnlyMatchingRoutes();
    this.dataSource = new MatTableDataSource<BusRoute>(this.data.busRoute);
    this.dataSource.paginator = this.paginator;
    this.sortBusRoutehByTime();
    this.GetDiscounts();
    this.subscribeToSeats();
  }

  public showOnlyMatchingRoutes(): void {
    const today = new Date();
    today.setMinutes(today.getMinutes() + 30);
    if (today.toDateString() === this.data.busRouteDate.toDateString()) {
      this.data.busRoute = this.data.busRoute.filter(x => {
        const busTime = new Date(this.data.busRouteDate.toDateString());
        busTime.setHours(x.hour, x.minute);
        if (today <= busTime) {
          return true;
        } else {
          return false;
        }
      });
    }
  }

  // Bus Routes
  public sortBusRoutehByTime(): void {
    this.data.busRoute.sort((val1, val2) => {
      return val1.minute - val2.minute;
    }).sort((val1, val2) => {
      return val1.hour - val2.hour;
    });
  }

  public chooseRoute(choosedBusRoute: BusRoute) {
    this.busRoute = choosedBusRoute;
    this.routeForm.controls.busRouteId.setValue(choosedBusRoute.busRouteId);
  }

  // User
  public setUserData(): void {
    if (this.userForm.controls.firstName.valid &&
      this.userForm.controls.surname.valid &&
      this.userForm.controls.phone.valid &&
      this.userForm.controls.email.valid) {
      this.user = new User();
      this.user.firstName = this.userForm.controls.firstName.value;
      this.user.surname = this.userForm.controls.surname.value;
      this.user.phone = this.userForm.controls.phone.value;
      this.user.email = this.userForm.controls.email.value;
      this.user.isDriver = false;
    }
  }

  // Seats
  public SearchOccupiedSeats(): void {
    this.seatsArray = Array(this.busRoute.bus.numberOfSeats).fill(0).map((x, i) => i + 1);

    this.ticketService.SearchOccupiedSeats(this.routeForm.controls.busRouteId.value, this.data.busRouteDate).subscribe(res => {
      this.clearValues();
      if (res) {
        this.setDisableSeats(res);
        this.occupiedSeats = res;
      }
    });
  }

  public BookSeat(seat: number): void {
    this.changeColorBookedSeats("green");
    if (this.bookedSeats.find(x => x == seat)) {
      const index: number = this.bookedSeats.indexOf(seat);
      this.bookedSeats.splice(index, 1);
    } else {
      this.bookedSeats.push(seat);
    }
    this.changeColorBookedSeats("#3f51b5");
    this.bookedSeats.sort((n1, n2) => n1 - n2);
  }

  private changeColorBookedSeats(color: string) {
    for (let bookedSeat of this.bookedSeats) {
      document.getElementById(bookedSeat.toString()).setAttribute("style", "color:" + color + ";");
    }
  }

  private clearValues(): void {
    this.bookedSeats = [];

    for (let seatId of this.seatsArray) {
      var seat = document.getElementById(seatId.toString());
      seat.setAttribute("style", "color:green;");
      (seat as HTMLButtonElement).disabled = false;
    }
  }

  private setDisableSeats(seats: number[]): void {
    for (let occupiedSeat of seats) {
      var seat = document.getElementById(occupiedSeat.toString());
      seat.setAttribute("style", "color:red;");
      (seat as HTMLButtonElement).disabled = true;
      for (let bookSeat of this.bookedSeats) {
        // Delete the seat who reservation another person
        if (occupiedSeat == bookSeat) {
          const index = this.bookedSeats.indexOf(bookSeat, 0);
          if (index > -1) {
            this.bookedSeats.splice(index, 1);
          }
        }
      }
    }
  }

  // Ticket

  public bookTicket(): void {
    if (this.bookedSeats.length > 0 && this.user && this.bookedSeats.length === this.numberSelectedTickets) {
      const ticket = new TicketDTO(this.data.busRouteDate, JSON.parse(JSON.stringify(this.bookedSeats)),
        this.busRoute, this.user,
        this.selectedDiscountTickets.filter(disc => this.selectedDiscountTicketsList.find(discList => discList.key === disc.key)));
      this.ticketService.AddTicket(ticket).subscribe(
        (res) => {
          ticket.ticketNumber = res;
          this.refreshSeats();
          Swal.fire(
            'Zarezerwowane',
            'Miejsca zostały zarezerwowane.',
            'success',
          ).then(okay => {
            if (okay) {
              this.dialogRef.close(ticket);
            }
          });
        },
        (err) => {
          Swal.fire(
            'Bład',
            'Wystąpił bład związany z rezerwacją.',
            'error'
          );
        }
      );
    } else {
      Swal.fire(
        '',
        'Proszę wybrać miejsca lub zniżki',
        'warning'
      );
    }
  }


  public buyTicket(): void {

    if (this.bookedSeats.length > 0 && this.user && this.bookedSeats.length === this.numberSelectedTickets) {
      const dialogRef = this.dialog.open(PaymentDialogComponent, {
        width: '20vw',
      });

      dialogRef.afterClosed().subscribe((isBought) => {
        if (isBought) {
          const ticket = new TicketDTO(this.data.busRouteDate, JSON.parse(JSON.stringify(this.bookedSeats)),
            this.busRoute, this.user,
            this.selectedDiscountTickets.filter(disc => this.selectedDiscountTicketsList.find(discList => discList.key === disc.key)),
            true);
          this.ticketService.AddTicket(ticket).subscribe(
            (res) => {
              ticket.ticketNumber = res;
              this.refreshSeats();
              Swal.fire(
                'Bilet kupiony',
                'Bilet na wybrane miejsca został kupiony.',
                'success',
              ).then(okay => {
                if (okay) {
                  this.dialogRef.close(ticket);
                }
              });
            },
            (err) => {
              Swal.fire(
                'Bład',
                'Wystąpił bład związany z rezerwacją.',
                'error'
              );
            }
          );
        }
      });
    } else {
      Swal.fire(
        '',
        'Proszę wybrać miejsca lub zniżki',
        'warning'
      );
    }
  }

  // Discount
  public GetDiscounts(): void {
    this.discountService.GetDiscounts().subscribe(res => {
      this.discounts = res;

      // Initialize selected discount
      this.selectedDiscountTickets = [{ key: 1, numberSeats: 1, discount: this.discounts[0] },
      { key: 2, numberSeats: 1, discount: this.discounts[0] },
      { key: 3, numberSeats: 1, discount: this.discounts[0] },
      { key: 4, numberSeats: 1, discount: this.discounts[0] },
      ];
      this.selectedDiscountTicketsList = [this.selectedDiscountTickets[0]];
      this.selectedNumberSeats();
    });
  }

  public addDiscount(): void {
    this.selectedDiscountTicketsList.push(this.selectedDiscountTickets[this.selectedDiscountTicketsList.length]);
    this.selectedNumberSeats();
  }
  public deleteDiscount(): void {
    this.selectedDiscountTicketsList[this.selectedDiscountTicketsList.length - 1].numberSeats = 1;
    this.selectedDiscountTicketsList[this.selectedDiscountTicketsList.length - 1].discount = this.discounts[0];
    this.selectedDiscountTicketsList.pop();
    this.selectedNumberSeats();
  }
  public selectedNumberSeats(): void {
    this.numberSelectedTickets = 0;
    this.selectedDiscountTickets.filter(disc => this.selectedDiscountTicketsList.find(discList => discList.key === disc.key)).map(disc => this.numberSelectedTickets += disc.numberSeats);
  }

  // SignalR
  private subscribeToSeats(): void {
    this.seatsService.occupiedSeats.subscribe((seats: Seats) => {

      if (seats.busRouteId == this.routeForm.controls.busRouteId.value && this.datepipe.transform(seats.travelDate, 'yyyy-MM-dd') == this.datepipe.transform(this.data.busRouteDate, 'yyyy-MM-dd')) {
        this.setDisableSeats(seats.occupiedSeats);
      }
    });
  }

  refreshSeats(): void {
    if (this.occupiedSeats) {
      this.seats = new Seats();
      this.seats.busRouteId = this.routeForm.controls.busRouteId.value;
      this.seats.travelDate = this.data.busRouteDate;
      this.seats.occupiedSeats = this.occupiedSeats;
      this.bookedSeats.forEach(seat => {
        this.seats.occupiedSeats.push(seat);
      });
      this.seatsService.refreshSeats(this.seats);

    }
  }

}