import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Bus } from 'src/app/shared/Model/Bus';
import { BusRoute } from 'src/app/shared/Model/BusRoute';
import { User } from 'src/app/shared/Model/User';
import { BusRouteService } from 'src/app/shared/Service/bus-route.service';
import { BusService } from 'src/app/shared/Service/bus.service';
import { UserService } from 'src/app/shared/Service/user.service';
import Swal from 'sweetalert2';
import { BusRouteDetailsDialogComponent } from './bus-route-details-dialog/bus-route-details-dialog.component';
import { BusRouteFormDialogComponent } from './bus-route-form-dialog/bus-route-form-dialog.component';
import { DriverDetailsDialogComponent } from './driver-details-dialog/driver-details-dialog.component';

@Component({
  selector: 'app-bus-route-management',
  templateUrl: './bus-route-management.component.html',
  styleUrls: ['./bus-route-management.component.css']
})
export class BusRouteManagementComponent implements OnInit, AfterViewInit {

  public displayedColumns = ['busRouteId', 'fromStation', 'toStation',
    'numberKm', 'price', 'throughStations', 'hour', 'minute', 'driverDetails', 'details', 'creationDate', 'update', 'delete'];
  public dataSource = new MatTableDataSource<BusRoute>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public allBuses: Bus[];
  public divers: User[];

  constructor(private busRouteService: BusRouteService,
    private busService: BusService,
    private userService: UserService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getBusRoutes();
    this.getBuses();
    this.getDivers();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getBusRoutes() {
    this.busRouteService.GetBusRoutes().subscribe(
      (res) => {
        this.dataSource.data = res as BusRoute[];
      }
    );
  }

  getBuses() {
    this.busService.GetBuses().subscribe((res) => {
      this.allBuses = res;
    });
  }

  getDivers() {
    this.userService.GetDrivers().subscribe((res) => {
      this.divers = res;
    });
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }


  public openAddBusRouteDialog(): void {
    const dialogRef = this.dialog.open(BusRouteFormDialogComponent, {
      width: '25vw',
      maxHeight: '100vh',
      data: {
        isEditing: false,
        busRoute: new BusRoute(),
        allBuses: this.allBuses,
        divers: this.divers
      }
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data !== undefined) {
        this.busRouteService.AddBusRoute(data).subscribe(
          () => {
            this.getBusRoutes();
            Swal.fire(
              'Operacja wykonana.',
              'Pomy??lnie dodano nowe po????czenie autobusowe.',
              'success',
            );
          },
          (err) => {
            Swal.fire(
              'B??ad',
              'Wyst??pi?? b??ad podczas dodawania po????czenia autobusowego.',
              'error'
            );
          }
        );
      }
    });

  }

  public openEditBusRouteDialog(editBusRoute: BusRoute): void {
    const dialogRef = this.dialog.open(BusRouteFormDialogComponent, {
      width: '25vw',
      maxHeight: '100vh',
      data: {
        isEditing: true,
        busRoute: editBusRoute,
        allBuses: this.allBuses,
        divers: this.divers
      }
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data !== undefined) {
        this.busRouteService.UpdateBusRoute(data).subscribe(
          () => {
            this.getBusRoutes();
            Swal.fire(
              'Operacja wykonana.',
              'Edycja po????czenia autobusowego powiod??a si??.',
              'success',
            );
          },
          (err) => {
            Swal.fire(
              'B??ad',
              'Wyst??pi?? b??ad podczas edycji po????czenia autobusowego.',
              'error'
            );
          }
        );
      }
    });

  }
  public deleteBusRoute(id: number): void {
    if (id !== undefined) {
      Swal.fire({
        title: `Czy na pewno chcesz usun???? po????czenie autobusowe o numerze ${id}?`,
        text: 'Nie b??dziesz w stanie tego cofn????!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Tak, usu??!',
        cancelButtonText: 'Anuluj'
      }).then((result) => {
        if (result.isConfirmed) {
          this.busRouteService.DeleteBusRoute(id).subscribe(
            () => {
              this.getBusRoutes();
              Swal.fire(
                'Usuni??to po????czenie autobusowe!',
                'Po????czenie zosta??o pomy??lnie usuni??t??.',
                'success'
              );
            },
            (err) => {
              Swal.fire(
                'B??ad',
                'Wyst??pi?? b??ad podczas usuwania po????czenie autobusowego.',
                'error'
              );
            }
          );

        }
      });
    }
  }

  public openDetailsBusDialog(bus: Bus): void {
    const dialogRef = this.dialog.open(BusRouteDetailsDialogComponent, {
      width: '25vw',
      maxHeight: '100vh',
      data: {
        bus
      }
    });
  }

  public openDriverDetailsDialog(user: User): void {
    const dialogRef = this.dialog.open(DriverDetailsDialogComponent, {
      width: '25vw',
      maxHeight: '100vh',
      data: {
        user
      }
    });
  }
}
