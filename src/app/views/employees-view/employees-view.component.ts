import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeModel } from 'src/app/models/EmployeeModel';
import { MessageService } from 'src/app/services/message.service';
import { ApiService } from 'src/app/services/api.service';
import { ApiResponse } from 'src/app/models/ApiResponse';
import { ApiErrorModel } from 'src/app/models/ApiErrorModel';
import { MatStepper } from '@angular/material/stepper';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from 'src/app/components/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-employees-view',
  templateUrl: './employees-view.component.html',
  styleUrls: ['./employees-view.component.scss']
})
export class EmployeesViewComponent implements OnInit {

  public registerEmployeeForm: FormGroup;
  public searchEmployeeFrom: FormGroup;
  private EmployeeSelected: EmployeeModel;
  public pageIndex: number = 0;
  public pageSize: number = 10;
  public displayedColumns: string[] = ['code', 'name', 'lastname', 'email', 'category', 'actions'];
  public dataSource = new MatTableDataSource<EmployeeModel>([]);
  public length: number = 0;
  public selection = new SelectionModel<EmployeeModel>(true, []);
  public pageSizeOptions: Array<number> = [5, 10, 15];

  constructor(
    private messageService: MessageService,
    private apiService: ApiService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.buildFormRegister();
    this.buildFormSearch();
    this.getEmployees();
  }

  buildFormRegister() {
    this.registerEmployeeForm = new FormGroup({
      identificationNumber: new FormControl('', [Validators.required]),
      identificationType: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      seconName: new FormControl(''),
      firstLastname: new FormControl('', [Validators.required]),
      seconLastname: new FormControl(''),
      email: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
    });
  }

  buildFormSearch() {
    this.searchEmployeeFrom = new FormGroup({
      code: new FormControl(''),
      firstName: new FormControl(''),
      firstLastname: new FormControl(''),
      category: new FormControl('TODAS'),
    })
  }

  saveEmployee(stepper: MatStepper) {
    if (this.registerEmployeeForm.invalid) {
      this.messageService.shortMessage('Los campos marcados en rojo deben ser verificacos');
      return;
    }
    const newEmployee: EmployeeModel = {
      ...this.registerEmployeeForm.value
    }
    newEmployee.code = this.EmployeeSelected ? this.EmployeeSelected.code : null;

    if (this.EmployeeSelected) {
      this.apiService.editEmployee(newEmployee, this.EmployeeSelected.code).subscribe(
        (response: any) => {
          this.messageService.shortMessage(response.message);
          this.EmployeeSelected = null;
          this.buildFormRegister();
          stepper.next();
          this.getEmployees();
        },
        (error: any) => {
          this.messageService.shortMessage(error.error.message);
        }
      )
    } else {
      this.apiService.saveEmployee(newEmployee).subscribe(
        (response: any) => {
          this.messageService.shortMessage(response.message);
          this.buildFormRegister();
          stepper.next();
          this.getEmployees();
        },
        (error: any) => {
          this.messageService.shortMessage(error.error.message);
        }
      )
    }
  }

  searchEmployee() {

  }

  getEmployees(event?: any) {
    const pageIndex = event ? event.pageIndex : this.pageIndex;
    const pageSize = event ? event.pageSize : this.pageSize;
    this.apiService.getEmployees(pageIndex, pageSize).subscribe(
      (response: ApiResponse<EmployeeModel>) => {
        this.dataSource = new MatTableDataSource<EmployeeModel>(response.items);
        this.length = response.totalItems;
      },
      (error: ApiErrorModel) => {
        this.messageService.shortMessage(error.error.message);
      }
    )
  }

  getItemToEdit(element: EmployeeModel, stepper: MatStepper) {
    this.EmployeeSelected = element;
    this.registerEmployeeForm.patchValue(element);
    stepper.previous();
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

  getChangeStepper(event) {
    console.log(event);
  }

}
