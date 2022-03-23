import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BusManagementComponent } from './bus-management/bus-management.component';
import { BusRouteManagementComponent } from './bus-route-management/bus-route-management.component';
import { DiscountManagementComponent } from './discount-management/discount-management.component';
import { TicketManagementComponent } from './ticket-management/ticket-management.component';
import { UserManagementComponent } from './user-management/user-management.component';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openBusManagementDialog(): void {
    const dialogRef = this.dialog.open(BusManagementComponent, {
      width: '65vw',
      maxHeight: '100vh'
    });
  }

  openBusRouteManagementDialog(): void {
    const dialogRef = this.dialog.open(BusRouteManagementComponent, {
      width: '65vw',
      maxHeight: '100vh'
    });
  }
  openUserManagementDialog(): void {
    const dialogRef = this.dialog.open(UserManagementComponent, {
      width: '65vw',
      maxHeight: '100vh'
    });
  }
  openTicketManagementDialog(): void {
    const dialogRef = this.dialog.open(TicketManagementComponent, {
      width: '65vw',
      maxHeight: '100vh'
    });
  }
  openDiscountManagementDialog(): void {
    const dialogRef = this.dialog.open(DiscountManagementComponent, {
      width: '65vw',
      maxHeight: '100vh'
    });
  }


}
