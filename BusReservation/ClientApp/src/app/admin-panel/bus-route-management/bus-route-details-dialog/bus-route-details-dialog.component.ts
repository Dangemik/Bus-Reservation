import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-bus-route-details-dialog',
  templateUrl: './bus-route-details-dialog.component.html',
  styleUrls: ['./bus-route-details-dialog.component.css']
})
export class BusRouteDetailsDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
