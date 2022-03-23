import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-discount-form-dialog',
  templateUrl: './discount-form-dialog.component.html',
  styleUrls: ['./discount-form-dialog.component.css']
})
export class DiscountFormDialogComponent implements OnInit {

  public isEditing: false;
  public form: FormGroup;

  constructor(public dialogRef: MatDialogRef<DiscountFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.isEditing = this.data.isEditing;
    this.form = new FormGroup({
      discountNameControl: new FormControl(this.data.discount.discountName, [Validators.required]),
      percentageDiscountControl: new FormControl(this.data.discount.percentageDiscount, [Validators.required,  Validators.pattern('[0-9]{1,}'), Validators.max(100)]),
    });
  }

  ngOnInit() {
  }

  public addEditDiscount(form: any): void {
    if (this.form.valid) {
      this.data.discount.discountName = form.discountNameControl;
      this.data.discount.percentageDiscount = Number(form.percentageDiscountControl);
      this.dialogRef.close(this.data.discount);
    }
  }

  public closeDialog(): void {
    this.dialogRef.close(undefined);
  }

}
