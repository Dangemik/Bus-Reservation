import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { Bus } from 'src/app/shared/Model/Bus';
import { BusService } from 'src/app/shared/Service/bus.service';
import { MatSort } from '@angular/material/sort';
import { BusFormDialogComponent } from './bus-form-dialog/bus-form-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bus-management',
  templateUrl: './bus-management.component.html',
  styleUrls: ['./bus-management.component.css']
})
export class BusManagementComponent implements OnInit, AfterViewInit {
  public displayedColumns = ['busId', 'busCompany', 'numberOfSeats', 'creationDate', 'update', 'delete'];
  public dataSource = new MatTableDataSource<Bus>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private busService: BusService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getBuses();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getBuses() {
    this.busService.GetBuses().subscribe(
      (res) => {
        this.dataSource.data = res as Bus[];
      }
    );
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public openAddBusDialog(): void {
    const dialogRef = this.dialog.open(BusFormDialogComponent, {
      width: '25vw',
      maxHeight: '100vh',
      data: {
        isEditing: false,
        bus: new Bus()
      }
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data !== undefined) {
        this.busService.AddBus(data).subscribe(
          () => {
            this.getBuses();
            Swal.fire(
              'Operacja wykonana.',
              'Pomyślnie dodano nowy autobus.',
              'success',
            );
          },
          (err) => {
            Swal.fire(
              'Bład',
              'Wystąpił bład podczas dodawania autobusu.',
              'error'
            );
          }
        );
      }
    });

  }

  public openEditBusDialog(editBus: Bus): void {
    const dialogRef = this.dialog.open(BusFormDialogComponent, {
      width: '25vw',
      maxHeight: '100vh',
      data: {
        isEditing: true,
        bus: editBus
      }
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data !== undefined) {
        this.busService.UpdateBus(data).subscribe(
          () => {
            this.getBuses();
            Swal.fire(
              'Operacja wykonana.',
              'Edycja autobusu powiodła się.',
              'success',
            );
          },
          (err) => {
            Swal.fire(
              'Bład',
              'Wystąpił bład podczas edycji autobusu.',
              'error'
            );
          }
        );
      }
    });
  }

  public deleteBus(id: number): void {
    if (id !== undefined) {
      Swal.fire({
        title: `Czy na pewno chcesz usunąć autobus o numerze ${id}?`,
        text: 'Nie będziesz w stanie tego cofnąć!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Tak, usuń!',
        cancelButtonText: 'Anuluj'
      }).then((result) => {
        if (result.isConfirmed) {
          this.busService.DeleteBus(id).subscribe(
            () => {
              this.getBuses();
              Swal.fire(
                'Usunięto autobus!',
                'Autobus został pomyślnie usunięty.',
                'success'
              );
            },
            (err) => {
              Swal.fire(
                'Bład',
                'Wystąpił bład podczas usuwania autobusu.',
                'error'
              );
            }
          );

        }
      });
    }
  }

}
