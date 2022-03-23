import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { User } from 'src/app/shared/Model/User';
import { UserService } from 'src/app/shared/Service/user.service';
import Swal from 'sweetalert2';
import { UserFormDialogComponent } from './user-form-dialog/user-form-dialog.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit, AfterViewInit {

  public displayedColumns = ['userId', 'firstName', 'surname', 'phone', 'email', 'creationDate', 'isDriver', 'update', 'delete'];
  public dataSource = new MatTableDataSource<User>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private userService: UserService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getUsers();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getUsers() {
    this.userService.GetUsers().subscribe((res) => {
      this.dataSource.data = res as User[];
    });
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public openAddUserDialog(): void {
    const dialogRef = this.dialog.open(UserFormDialogComponent, {
      width: '25vw',
      maxHeight: '100vh',
      data: {
        isEditing: false,
        user: new User()
      }
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data !== undefined) {
        this.userService.AddUser(data).subscribe(
          () => {
            this.getUsers();
            Swal.fire(
              'Operacja wykonana.',
              'Pomyślnie dodano nowego użytkownika.',
              'success',
            );
          },
          (err) => {
            Swal.fire(
              'Bład',
              'Wystąpił bład podczas dodawania użytkownika.',
              'error'
            );
          }
        );
      }
    });

  }

  public openEditUserDialog(editUser: User): void {
    const dialogRef = this.dialog.open(UserFormDialogComponent, {
      width: '25vw',
      maxHeight: '100vh',
      data: {
        isEditing: true,
        user: editUser
      }
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data !== undefined) {
        this.userService.UpdateUser(data).subscribe(
          () => {
            this.getUsers();
            Swal.fire(
              'Operacja wykonana.',
              'Edycja użytkownika powiodła się.',
              'success',
            );
          },
          (err) => {
            Swal.fire(
              'Bład',
              'Wystąpił bład podczas edycji użytkownika.',
              'error'
            );
          }
        );
      }
    });
  }

  public deleteUser(id: number): void {
    if (id !== undefined) {
      Swal.fire({
        title: `Czy na pewno chcesz usunąć użytkownika o id ${id}?`,
        text: 'Nie będziesz w stanie tego cofnąć!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Tak, usuń!',
        cancelButtonText: 'Anuluj'
      }).then((result) => {
        if (result.isConfirmed) {
          this.userService.DeleteUser(id).subscribe(
            () => {
              this.getUsers();
              Swal.fire(
                'Usunięto użytkownika!',
                'Użytkownik został pomyślnie usunięty.',
                'success'
              );
            },
            (err) => {
              Swal.fire(
                'Bład',
                'Wystąpił bład podczas usuwania użytkownika.',
                'error'
              );
            }
          );

        }
      });
    }
  }


}
