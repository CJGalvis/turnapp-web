import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogConfirmComponent } from 'src/app/components/dialog-confirm/dialog-confirm.component';
import { ApiErrorModel } from 'src/app/models/ApiErrorModel';
import { ApiResponse } from 'src/app/models/ApiResponse';
import { EmployeeModel } from 'src/app/models/EmployeeModel';
import { ApiService } from 'src/app/services/api.service';
import { MessageService } from 'src/app/services/message.service';
import { DialogEditEmployeeComponent } from 'src/app/components/dialog-edit-employee/dialog-edit-employee.component';
import { CategoryModel } from 'src/app/models/CategoryModel';
import { consts } from 'src/app/const';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'turnapp-employee-list-view',
  templateUrl: './employee-list-view.component.html',
  styleUrls: ['./employee-list-view.component.scss']
})
export class EmployeeListViewComponent implements OnInit {

  public searchEmployeeFrom: FormGroup;
  public pageIndex: number = consts.pageIndex;
  public pageSize: number = consts.pageSize;
  public pageSizeOptions: Array<number> = consts.pageSizeOptions;
  public displayedColumns: string[] = ['code', 'name', 'lastname', 'email', 'category', 'actions'];
  public dataSource = new MatTableDataSource<EmployeeModel>([]);
  public length: number = 0;
  public categoriesList: Array<CategoryModel> = [];
  public isRunning: boolean;

  constructor(
    private messageService: MessageService,
    private apiService: ApiService,
    private dialog: MatDialog,
    private globalService: GlobalService
  ) { }

  ngOnInit(): void {
    this.globalService.getRunning().subscribe(value => this.isRunning = value);
    this.buildFormSearch();
    this.getCategories();
  }

  buildFormSearch() {
    this.searchEmployeeFrom = new FormGroup({
      code: new FormControl(''),
      firstName: new FormControl(''),
      firstLastname: new FormControl(''),
      category: new FormControl([]),
    })
    this.pageIndex = consts.pageIndex;
    this.pageSize = consts.pageSize;
    this.pageSizeOptions = consts.pageSizeOptions;
    this.length = 0;
  }

  getEmployees(event?: any) {
    const pageIndex = event ? event.pageIndex * this.pageSize : this.pageIndex;
    const pageSize = event ? event.pageSize : this.pageSize;
    const filter = this.searchEmployeeFrom.value;
    let categoriesSelected: Array<string> = this.searchEmployeeFrom.get('category').value || [];
    if (categoriesSelected.length == 0) {
      categoriesSelected = this.categoriesList.map(item => item._id);
    }
    filter.category = categoriesSelected;
    this.apiService.getEmployeesFilter(filter, pageIndex, pageSize).subscribe(
      (response: ApiResponse<EmployeeModel>) => {
        this.dataSource = new MatTableDataSource<EmployeeModel>(response.items);
        this.length = response.totalItems;
      }
    )
  }

  // getEmployees(event?: any) {
  //   this.pageIndex = event ? event.pageIndex * this.pageSize : this.pageIndex;
  //   this.pageSize = event ? event.pageSize : this.pageSize;
  //   this.apiService.getEmployees(this.pageIndex, this.pageSize).subscribe(
  //     (response: ApiResponse<EmployeeModel>) => {
  //       this.dataSource = new MatTableDataSource<EmployeeModel>(response.items);
  //       this.length = response.totalItems;
  //     },
  //     (error: ApiErrorModel) => {
  //       this.messageService.shortMessage(error.error.message);
  //     }
  //   )
  // }

  getItemToEdit(element: EmployeeModel,) {
    const dialogRef = this.dialog.open(DialogEditEmployeeComponent, {
      data: element
    })

    dialogRef.afterClosed().subscribe(
      (value: boolean) => {
        if (value) this.getEmployees();
      }
    )
  }

  goToDelete(element: EmployeeModel) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '250px',
      data: {
        title: 'Confirmación',
        message: '¿Está seguro de querer eliminar a este empleado?'
      }
    });

    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.apiService.deleteEmployee(element.code).subscribe(
            (response: ApiResponse<EmployeeModel>) => {
              this.messageService.shortMessage(response.message);
              this.getEmployees();
            },
            (error: ApiErrorModel) => {
              this.messageService.shortMessage(error.error.message);
            }
          )
        }
      }
    );
  }

  getCategories() {
    this.apiService.getCategories(0, 1000).subscribe(
      (response: ApiResponse<any>) => {
        this.categoriesList = response.items;
        this.getEmployees();
      },
      (error: any) => {
        this.messageService.shortMessage(error.error.message);
      }
    )
  }

}
