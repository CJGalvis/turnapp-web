import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeeListViewComponent } from './views/employees-view/employee-list-view/employee-list-view.component';
import { EmployeeRegisterViewComponent } from './views/employees-view/employee-register-view/employee-register-view.component';
import { EmployeesViewComponent } from './views/employees-view/employees-view.component';
import { HomeViewComponent } from './views/home-view/home-view.component';
import { SettingsCategoriesViewComponent } from './views/settings-view/settings-categories-view/settings-categories-view.component';
import { SettingsIdentificationTypesViewComponent } from './views/settings-view/settings-identification-types-view/settings-identification-types-view.component';
import { SettingsShedulesViewComponent } from './views/settings-view/settings-shedules-view/settings-shedules-view.component';
import { SettingsViewComponent } from './views/settings-view/settings-view.component';
import { SheduleViewComponent } from './views/shedule-view/shedule-view.component';
import { PermissionsViewComponent } from './views/permissions-view/permissions-view.component';
import { LoginViewComponent } from './views/login-view/login-view.component';
import { ResetPasswordViewComponent } from './views/reset-password-view/reset-password-view.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginViewComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordViewComponent
  },
  {
    path: 'dashboard',
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
      {
        path: 'settings',
        component: SettingsViewComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'shedules'
          },
          {
            path: 'shedules',
            component: SettingsShedulesViewComponent
          },
          {
            path: 'categories',
            component: SettingsCategoriesViewComponent
          },
          {
            path: 'identification-types',
            component: SettingsIdentificationTypesViewComponent
          }
        ]
      },
      {
        path: 'permissions',
        component: PermissionsViewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
