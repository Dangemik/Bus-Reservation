import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.css']
})
export class PaymentDialogComponent implements OnInit {

  blikCode = new FormControl('', [Validators.required,  Validators.pattern('[0-9]{6}')]);

  constructor(public dialogRef: MatDialogRef<PaymentDialogComponent>) {
  }

  ngOnInit() {
  }
  payTheTicket(blikCode: string) {
    if (blikCode === '000000') {
      this.dialogRef.close(true);
    } else {
      Swal.fire(
        'Bład',
        'Wystąpił bład podczas płatności. Upewnij się czy kod blink jest poprawny.',
        'error'
      );
    }
  }

  public closeDialog(): void {
    this.dialogRef.close(false);
  }

}
