import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Bus } from 'src/app/shared/Model/Bus';
import { User } from 'src/app/shared/Model/User';

@Component({
  selector: 'app-bus-route-form-dialog',
  templateUrl: './bus-route-form-dialog.component.html',
  styleUrls: ['./bus-route-form-dialog.component.css']
})
export class BusRouteFormDialogComponent implements OnInit {

  public isEditing: false;
  public form: FormGroup;

  filteredBusOptions: Observable<Bus[]>;
  filteredDiversOptions: Observable<User[]>;

  constructor(public dialogRef: MatDialogRef<BusRouteFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.isEditing = this.data.isEditing;
    this.form = new FormGroup({
      fromStationControl: new FormControl(this.data.busRoute.fromStation, [Validators.required]),
      toStationControl: new FormControl(this.data.busRoute.toStation, [Validators.required]),
      busControl: new FormControl(this.data.busRoute.bus, [Validators.required]),
      numberKmControl: new FormControl(this.data.busRoute.numberKm, [Validators.required, Validators.pattern('[0-9]{1,}')]),
      priceControl: new FormControl(this.data.busRoute.price, [Validators.required, Validators.pattern('[0-9.]{1,}')]),
      throughStationsControl: new FormControl(this.data.busRoute.throughStations),
      hourControl: new FormControl(this.data.busRoute.hour, [Validators.required, Validators.pattern('[0-9]{1,2}'), Validators.max(24)]),
      minuteControl: new FormControl(this.data.busRoute.minute, [Validators.required, Validators.pattern('[0-9]{1,2}'),
      Validators.max(59)]),
      userControl: new FormControl(this.data.busRoute.user, [Validators.required]),
    });
  }

  ngOnInit() {
    this.filteredBusOptions = this.form.controls.busControl.valueChanges
      .pipe(
      startWith(''),
      map(value => this._filterBus(value.toString()))
    );

    this.filteredDiversOptions = this.form.controls.userControl.valueChanges
      .pipe(
      startWith(''),
      map(value => this._filterDivers(value.toString()))
    );
  }

  public addEditBusRoute(form: any): void {
    if (this.form.valid) {
      this.data.busRoute.fromStation = form.fromStationControl;
      this.data.busRoute.toStation = form.toStationControl;
      this.data.busRoute.numberKm = Number(form.numberKmControl);
      this.data.busRoute.price = Number(form.priceControl);
      this.data.busRoute.throughStations = form.throughStationsControl;
      this.data.busRoute.hour = Number(form.hourControl);
      this.data.busRoute.minute = Number(form.minuteControl);
      this.data.busRoute.bus = form.busControl;
      this.data.busRoute.user = form.userControl;
      this.dialogRef.close(this.data.busRoute);
    }
  }

  public closeDialog(): void {
    this.dialogRef.close(undefined);
  }

  displayBus(bus: Bus): string {
    return bus ? bus.busId + ' ' + bus.busCompany + ' ' +  bus.numberOfSeats : '';
  }

  displayDiver(user: User): string {
    return user ? user.userId + ' ' + user.firstName + ' ' +  user.surname : '';
  }

  private _filterBus(value: string): Bus[] {
    const filterValue = value.toLowerCase();

    return this.data.allBuses.filter(option =>
     option.busId.toString().includes(filterValue) ||
     option.busCompany.toLowerCase().includes(filterValue) ||
     option.numberOfSeats.toString().includes(filterValue));
   }

   private _filterDivers(value: string): User[] {
    const filterValue = value.toLowerCase();

    return this.data.divers.filter(option =>
     option.userId.toString().includes(filterValue) ||
     option.firstName.toLowerCase().includes(filterValue) ||
     option.surname.toString().includes(filterValue));
   }
}
