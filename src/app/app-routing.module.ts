import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeeListViewComponent } from './views/employees-view/employee-list-view/employee-list-view.component';
import { EmployeeRegisterViewComponent } from './views/employees-view/employee-register-view/employee-register-view.component';
import { EmployeesViewComponent } from './views/employees-view/employees-view.component';
import { HomeViewComponent } from './views/home-view/home-view.component';
import { SheduleViewComponent } from './views/shedule-view/shedule-view.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'turnapp'
  },
  {
    path: 'turnapp',
    component: DashboardComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      },
      {
        path: 'home',
        component: HomeViewComponent
      },
      {
        path: 'employees',
        component: EmployeesViewComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'list'
          },
          {
            path: 'register',
            component: EmployeeRegisterViewComponent
          },
          {
            path: 'list',
            component: EmployeeListViewComponent
          }
        ]
      },
      {
        path: 'shedules',
        component: SheduleViewComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
