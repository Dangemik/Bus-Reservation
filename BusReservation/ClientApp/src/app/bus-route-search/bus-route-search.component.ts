import { Component, OnInit } from '@angular/core';
import { BusRoute } from '../shared/Model/BusRoute';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ReservationDialogComponent } from '../reservation-dialog/reservation-dialog.component';
import { BookingSummaryDialogComponent } from '../booking-summary-dialog/booking-summary-dialog.component';
import { BusRouteService } from '../shared/Service/bus-route.service';


@Component({
  selector: 'app-bus-route-search',
  templateUrl: './bus-route-search.component.html',
  styleUrls: ['./bus-route-search.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pl-PL' },
  ],
})
export class BusRouteSearchComponent implements OnInit {

  public allBusRoutes: BusRoute[];
  public minTravelDate = new Date();

  routes = new FormGroup({
    fromStation: new FormControl('', Validators.required),
    toStation: new FormControl('', Validators.required),
    date: new FormControl(new Date(), Validators.required)
  });

  filteredOptionsFromStation: Observable<BusRoute[]>;
  filteredOptionsToStation: Observable<BusRoute[]>;

  constructor(
    private busRouteService: BusRouteService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.LoadBusPaths();
  }
  public LoadBusPaths(): void {
    this.busRouteService.GetBusRoutes().subscribe(res => {
      this.allBusRoutes = res;
      this.filteredOptions();
    });

  }
  public filteredOptions(): void {
    this.filteredOptionsFromStation = this.routes.controls.fromStation.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.fromStation),
        map(fromStation => fromStation ? this._filter(fromStation, 'fromStation') : this.getUniqueValueBusRoutes('fromStation').slice())
      );

    this.filteredOptionsToStation = this.routes.controls.toStation.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.toStation),
        map(toStation => toStation ? this._filter(toStation, 'toStation') : this.getUniqueValueBusRoutes('toStation').slice())
      );
  }

  displayFromStation(route: BusRoute): string {
    return route && route.fromStation ? route.fromStation : '';
  }
  displayToStation(route: BusRoute): string {
    return route && route.toStation ? route.toStation : '';
  }

  private _filter(name: string, travel: string): BusRoute[] {
    const filterValue = name.toLowerCase();
    if (travel === 'fromStation') {
      return this.getUniqueValueBusRoutes('fromStation').filter(option => option.fromStation.toLowerCase().indexOf(filterValue) === 0);
    }
    if (travel === 'toStation') {
      return this.getUniqueValueBusRoutes('toStation').filter(option => option.toStation.toLowerCase().indexOf(filterValue) === 0);
    }
  }

  private getUniqueValueBusRoutes(travel: string) {
    if (travel === 'fromStation') {
      return this.allBusRoutes.filter(function (elem, index, self) {
        return index === self.map(x => x.fromStation).indexOf(elem.fromStation);
      });
    }
    if (travel === 'toStation') {
      return this.allBusRoutes.filter(function (elem, index, self) {
        return index === self.map(x => x.toStation).indexOf(elem.toStation);
      });
    }

  }

  public openReservationDialog() {

    if (this.routes.controls.fromStation.value &&
      this.routes.controls.toStation.value &&
      this.routes.controls.date.value) {
      const dialogRef = this.dialog.open(ReservationDialogComponent, {
        width: '90vw',
        maxHeight: '100vh',
        data: {
          busRoute: this.allBusRoutes.filter(busRoute => busRoute.fromStation === this.routes.controls.fromStation.value.fromStation &&
            busRoute.toStation === this.routes.controls.toStation.value.toStation),
          busRouteDate: new Date(this.routes.controls.date.value.toString() + 'UTC')
        }
      });

      dialogRef.afterClosed().subscribe((data) => {
        if (data !== undefined) {
          const dialogRefSummary = this.dialog.open(BookingSummaryDialogComponent, {
            width: '50vw',
            maxHeight: '100vh',
            data: data
          })
        }
      });
    }
  }

}
