import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-bus-form-dialog',
  templateUrl: './bus-form-dialog.component.html',
  styleUrls: ['./bus-form-dialog.component.css']
})
export class BusFormDialogComponent implements OnInit {

  public isEditing: false;
  public form: FormGroup;

  constructor(public dialogRef: MatDialogRef<BusFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.isEditing = this.data.isEditing;
    this.form = new FormGroup({
      busCompanyControl: new FormControl(this.data.bus.busCompany, [Validators.required]),
      numberOfSeatsControl: new FormControl(this.data.bus.numberOfSeats, [Validators.required, Validators.pattern('[0-9]{1,}')])
    });
  }

  ngOnInit() {
  }

  public addEditBus(form: any): void {
    if (this.form.valid) {
      this.data.bus.busCompany = form.busCompanyControl;
      this.data.bus.numberOfSeats = Number(form.numberOfSeatsControl);
      this.dialogRef.close(this.data.bus);
    }
  }

  public closeDialog(): void {
    this.dialogRef.close(undefined);
  }

}
