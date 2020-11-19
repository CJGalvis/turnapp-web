import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { DialogConfirmComponent } from 'src/app/components/dialog-confirm/dialog-confirm.component';
import { ApiErrorModel } from 'src/app/models/ApiErrorModel';
import { ApiResponse } from 'src/app/models/ApiResponse';
import { EmployeeModel } from 'src/app/models/EmployeeModel';
import { ApiService } from 'src/app/services/api.service';
import { MessageService } from 'src/app/services/message.service';
import { DialogEditEmployeeComponent } from 'src/app/components/dialog-edit-employee/dialog-edit-employee.component';
import { CategoryModel } from 'src/app/models/CategoryModel';

@Component({
  selector: 'turnapp-employee-list-view',
  templateUrl: './employee-list-view.component.html',
  styleUrls: ['./employee-list-view.component.scss']
})
export class EmployeeListViewComponent implements OnInit {

  public searchEmployeeFrom: FormGroup;
  public pageIndex: number = 0;
  public pageSize: number = 10;
  public displayedColumns: string[] = ['code', 'name', 'lastname', 'email', 'category', 'actions'];
  public dataSource = new MatTableDataSource<EmployeeModel>([]);
  public length: number = 0;
  public selection = new SelectionModel<EmployeeModel>(true, []);
  public pageSizeOptions: Array<number> = [5, 10, 15];
  public categoriesList: Array<CategoryModel> = [];

  constructor(
    private messageService: MessageService,
    private apiService: ApiService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.buildFormSearch();
    this.getCategories();
    this.getEmployees();
  }

  buildFormSearch() {
    this.searchEmployeeFrom = new FormGroup({
      code: new FormControl(''),
      firstName: new FormControl(''),
      firstLastname: new FormControl(''),
      category: new FormControl([]),
    })
  }

  searchEmployee() {
    this.pageIndex = 0;
    this.pageSize = 10;
    const filter = this.searchEmployeeFrom.value
    let categoriesSelected: Array<string> = this.searchEmployeeFrom.get('category').value || [];
    if (categoriesSelected.length == 0) {
      categoriesSelected = this.categoriesList.map(item => item._id);
    }
    filter.cateogry = categoriesSelected;
    this.apiService.getEmployeesFilter(filter, this.pageIndex, this.pageSize).subscribe(
      (response: ApiResponse<EmployeeModel>) => {
        this.dataSource = new MatTableDataSource<EmployeeModel>(response.items);
        this.length = response.totalItems;
      }
    )
  }

  getEmployees(event?: any) {
    this.pageIndex = event ? event.pageIndex : this.pageIndex;
    this.pageSize = event ? event.pageSize : this.pageSize;
    this.apiService.getEmployees(this.pageIndex, this.pageSize).subscribe(
      (response: ApiResponse<EmployeeModel>) => {
        this.dataSource = new MatTableDataSource<EmployeeModel>(response.items);
        this.length = response.totalItems;
      },
      (error: ApiErrorModel) => {
        this.messageService.shortMessage(error.error.message);
      }
    )
  }

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
    this.apiService.getCategories().subscribe(
      (response: ApiResponse<any>) => {
        this.categoriesList = response.items;
      },
      (error: any) => {
        this.messageService.shortMessage(error.error.message);
      }
    )
  }

}
