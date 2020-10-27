import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
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
        component: EmployeesViewComponent
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
