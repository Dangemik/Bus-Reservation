import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { TicketResponse } from 'src/app/shared/Model/TicketResponse';
import { TicketService } from 'src/app/shared/Service/ticket.service';
import { TicketDetailsDialogComponent } from './ticket-details-dialog/ticket-details-dialog.component';

@Component({
  selector: 'app-ticket-management',
  templateUrl: './ticket-management.component.html',
  styleUrls: ['./ticket-management.component.css']
})
export class TicketManagementComponent implements OnInit, AfterViewInit {

  public displayedColumns = ['ticketNumber', 'travelDate', 'time', 'fromStation', 'toStation', 'seats', 'creationDate', 'details'];
  public dataSource = new MatTableDataSource<TicketResponse>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private ticketService: TicketService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getTicket();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  getTicket() {
    this.ticketService.GetTickets().subscribe(
      (res) => {
        this.dataSource.data = res as TicketResponse[];
      }
    );
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public openDetailsTicketDialog(ticket: TicketResponse): void {
    const dialogRef = this.dialog.open(TicketDetailsDialogComponent, {
      width: '50vw',
      maxHeight: '100vh',
      data: ticket
    });
  }

}
