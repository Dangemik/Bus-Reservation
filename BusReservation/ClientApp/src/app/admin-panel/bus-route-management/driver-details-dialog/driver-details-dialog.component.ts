import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-driver-details-dialog',
  templateUrl: './driver-details-dialog.component.html',
  styleUrls: ['./driver-details-dialog.component.css']
})
export class DriverDetailsDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.data.user.firstName);
  }

}
