import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppInterceptor } from './app-interceptor';

import { MatNativeDateModule } from '@angular/material/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTabsModule } from '@angular/material/tabs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HomeViewComponent } from './views/home-view/home-view.component';
import { EmployeesViewComponent } from './views/employees-view/employees-view.component';
import { SheduleViewComponent } from './views/shedule-view/shedule-view.component';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { HttpDisabledDirective } from './directives/http-disabled.directive';
import { DialogConfirmComponent } from './components/dialog-confirm/dialog-confirm.component';
import { EmployeeRegisterViewComponent } from './views/employees-view/employee-register-view/employee-register-view.component';
import { EmployeeListViewComponent } from './views/employees-view/employee-list-view/employee-list-view.component';
import { DialogEditEmployeeComponent } from './components/dialog-edit-employee/dialog-edit-employee.component';
import { SettingsViewComponent } from './views/settings-view/settings-view.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeViewComponent,
    EmployeesViewComponent,
    SheduleViewComponent,
    HttpDisabledDirective,
    DialogConfirmComponent,
    EmployeeRegisterViewComponent,
    EmployeeListViewComponent,
    DialogEditEmployeeComponent,
    SettingsViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatStepperModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSnackBarModule,
    HttpClientModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    }
  ],
  entryComponents: [
    DialogConfirmComponent,
    DialogEditEmployeeComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
