import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Discount } from 'src/app/shared/Model/Discount';
import { DiscountService } from 'src/app/shared/Service/discount.service';
import Swal from 'sweetalert2';
import { DiscountFormDialogComponent } from './discount-form-dialog/discount-form-dialog.component';

@Component({
  selector: 'app-discount-management',
  templateUrl: './discount-management.component.html',
  styleUrls: ['./discount-management.component.css']
})
export class DiscountManagementComponent implements OnInit, AfterViewInit {

  public displayedColumns = ['discountId', 'discountName', 'percentageDiscount', 'creationDate', 'update', 'delete'];
  public dataSource = new MatTableDataSource<Discount>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private discountService: DiscountService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getDiscount();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getDiscount() {
    this.discountService.GetDiscounts().subscribe(
      (res) => {
        this.dataSource.data = res as Discount[];
      }
    );
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public openAddDiscountDialog(): void {
    const dialogRef = this.dialog.open(DiscountFormDialogComponent, {
      width: '25vw',
      maxHeight: '100vh',
      data: {
        isEditing: false,
        discount: new Discount()
      }
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data !== undefined) {
        this.discountService.AddDiscount(data).subscribe(
          () => {
            this.getDiscount();
            Swal.fire(
              'Operacja wykonana.',
              'Pomyślnie dodano nową zniżkę.',
              'success',
            );
          },
          (err) => {
            Swal.fire(
              'Bład',
              'Wystąpił bład podczas dodawania zniżki.',
              'error'
            );
          }
        );
      }
    });

  }

  public openEditDiscountDialog(editDiscount: Discount): void {
    const dialogRef = this.dialog.open(DiscountFormDialogComponent, {
      width: '25vw',
      maxHeight: '100vh',
      data: {
        isEditing: true,
        discount: editDiscount
      }
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data !== undefined) {
        this.discountService.UpdateDiscount(data).subscribe(
          () => {
            this.getDiscount();
            Swal.fire(
              'Operacja wykonana.',
              'Edycja zniżki powiodła się.',
              'success',
            );
          },
          (err) => {
            Swal.fire(
              'Bład',
              'Wystąpił bład podczas edycji zniżki.',
              'error'
            );
          }
        );
      }
    });
  }

  public deleteDiscount(id: number): void {
    if (id !== undefined) {
      Swal.fire({
        title: `Czy na pewno chcesz usunąć zniżkę o id ${id}?`,
        text: 'Nie będziesz w stanie tego cofnąć!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Tak, usuń!',
        cancelButtonText: 'Anuluj'
      }).then((result) => {
        if (result.isConfirmed) {
          this.discountService.DeleteDiscount(id).subscribe(
            () => {
              this.getDiscount();
              Swal.fire(
                'Usunięto zniżkę!',
                'Zniżka został pomyślnie usunięta.',
                'success'
              );
            },
            (err) => {
              Swal.fire(
                'Bład',
                'Wystąpił bład podczas usuwania zniżki.',
                'error'
              );
            }
          );

        }
      });
    }
  }

}
