import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, DateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ReservationDialogComponent } from './reservation-dialog/reservation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatGridListModule } from '@angular/material/grid-list';
import { BusRouteSearchComponent } from './bus-route-search/bus-route-search.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { BookingSummaryDialogComponent } from './booking-summary-dialog/booking-summary-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { SeatsService } from './shared/Service/seats.service';
import { DatePipe } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminGuard } from './guards/admin.guard';
import { HttpInterceptorService } from './shared/Service/http-interceptor.service';
import { ErrorInterceptorService } from './shared/Service/error-interceptor.service';
import { BusManagementComponent } from './admin-panel/bus-management/bus-management.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BusFormDialogComponent } from './admin-panel/bus-management/bus-form-dialog/bus-form-dialog.component';
import { BusRouteManagementComponent } from './admin-panel/bus-route-management/bus-route-management.component';
import { BusRouteFormDialogComponent } from './admin-panel/bus-route-management/bus-route-form-dialog/bus-route-form-dialog.component';
import { UserManagementComponent } from './admin-panel/user-management/user-management.component';
import { UserFormDialogComponent } from './admin-panel/user-management/user-form-dialog/user-form-dialog.component';
import { TicketManagementComponent } from './admin-panel/ticket-management/ticket-management.component';
import { BusRouteDetailsDialogComponent } from './admin-panel/bus-route-management/bus-route-details-dialog/bus-route-details-dialog.component';
import { TicketDetailsDialogComponent } from './admin-panel/ticket-management/ticket-details-dialog/ticket-details-dialog.component';
import { DiscountManagementComponent } from './admin-panel/discount-management/discount-management.component';
import { DiscountFormDialogComponent } from './admin-panel/discount-management/discount-form-dialog/discount-form-dialog.component';
import { PaymentDialogComponent } from './reservation-dialog/payment-dialog/payment-dialog.component';
import { MatCheckboxModule } from '@angular/material';
import { DriverDetailsDialogComponent } from './admin-panel/bus-route-management/driver-details-dialog/driver-details-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    ReservationDialogComponent,
    BusRouteSearchComponent,
    BookingSummaryDialogComponent,
    LoginComponent,
    AdminPanelComponent,
    BusManagementComponent,
    BusFormDialogComponent,
    BusRouteManagementComponent,
    BusRouteFormDialogComponent,
    BusRouteDetailsDialogComponent,
    UserManagementComponent,
    UserFormDialogComponent,
    TicketManagementComponent,
    TicketDetailsDialogComponent,
    DiscountManagementComponent,
    DiscountFormDialogComponent,
    PaymentDialogComponent,
    DriverDetailsDialogComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatStepperModule,
    MatGridListModule,
    MatIconModule,
    MatTooltipModule,
    MatSelectModule,
    MatCardModule,
    MatCheckboxModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'admin-home', component: AdminPanelComponent, canActivate: [AdminGuard] }
    ]),
    BrowserAnimationsModule
  ],
  exports: [
    MatSortModule
  ],
  entryComponents: [
    ReservationDialogComponent,
    BookingSummaryDialogComponent,
    BusManagementComponent,
    BusFormDialogComponent,
    BusRouteManagementComponent,
    BusRouteFormDialogComponent,
    BusRouteDetailsDialogComponent,
    UserManagementComponent,
    UserFormDialogComponent,
    TicketManagementComponent,
    TicketDetailsDialogComponent,
    DiscountManagementComponent,
    DiscountFormDialogComponent,
    PaymentDialogComponent,
    DriverDetailsDialogComponent
  ],
  providers: [ SeatsService, DatePipe, { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private dateAdapter: DateAdapter<Date>) {
    dateAdapter.setLocale('en-in'); // DD/MM/YYYY
  }

}
