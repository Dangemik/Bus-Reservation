import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-user-form-dialog',
  templateUrl: './user-form-dialog.component.html',
  styleUrls: ['./user-form-dialog.component.css']
})
export class UserFormDialogComponent implements OnInit {

  public isEditing: false;
  public form: FormGroup;

  constructor(public dialogRef: MatDialogRef<UserFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.isEditing = this.data.isEditing;
      this.form = new FormGroup({
        firstNameControl: new FormControl(this.data.user.firstName, [Validators.required]),
        surnameControl: new FormControl(this.data.user.surname, [Validators.required]),
        phoneControl: new FormControl(this.data.user.phone, [Validators.required, Validators.pattern('[0-9]{9}')]),
        emailControl: new FormControl(this.data.user.email, [Validators.required, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z0-9.-]{2,}[.]{1}[a-zA-Z]{2,}')]),
        isDriverControl: new FormControl(this.data.user.isDriver),
      });
     }

  ngOnInit() {
  }

  public addEditUser(form: any): void {
    if (this.form.valid) {
      this.data.user.firstName = form.firstNameControl;
      this.data.user.surname = form.surnameControl;
      this.data.user.phone = form.phoneControl;
      this.data.user.email = form.emailControl;
      this.data.user.isDriver = form.isDriverControl;
      this.dialogRef.close(this.data.user);
    }
  }

  public closeDialog(): void {
    this.dialogRef.close(undefined);
  }

}
