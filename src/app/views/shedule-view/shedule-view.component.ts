import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { forkJoin } from 'rxjs';
import { consts } from 'src/app/const';
import { ApiErrorModel } from 'src/app/models/ApiErrorModel';
import { ApiResponse } from 'src/app/models/ApiResponse';
import { CategoryModel } from 'src/app/models/CategoryModel';
import { EmployeeModel } from 'src/app/models/EmployeeModel';
import { ApiService } from 'src/app/services/api.service';
import { GlobalService } from 'src/app/services/global.service';
import { MessageService } from 'src/app/services/message.service';
import { SheduleModel } from 'src/app/models/SheduleModel';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from 'src/app/components/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-shedule-view',
  templateUrl: './shedule-view.component.html',
  styleUrls: ['./shedule-view.component.scss']
})
export class SheduleViewComponent implements OnInit {

  public employees: Array<EmployeeModel>;
  public registerSheduleForm: FormGroup;
  public sheduleSelected: SheduleModel;
  public now: Date = new Date;
  public turns: Array<any> = [];
  public categoriesList: Array<CategoryModel> = [];
  public hasErrors: boolean;
  public pageIndex: number = consts.pageIndex;
  public pageSize: number = consts.pageSize;
  public pageSizeOptions: Array<number> = consts.pageSizeOptions;
  public displayedColumns: string[] = ['employee', 'date', 'type', 'hours', 'actions'];
  public dataSource = new MatTableDataSource<EmployeeModel>([]);
  public length: number = 0;
  public isRunning: boolean;

  constructor(
    private messageService: MessageService,
    private apiService: ApiService,
    private globalService: GlobalService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.globalService.getRunning().subscribe(value => this.isRunning = value);
    this.buildForm();
    this.getData();
    this.getShedules();
  }

  buildForm() {
    this.registerSheduleForm = new FormGroup({
      employeeCode: new FormControl('', [Validators.required]),
      firstName: new FormControl(''),
      firstLastname: new FormControl(''),
      category: new FormControl(''),
      dateStart: new FormControl('', [Validators.required]),
      dateEnd: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      hours: new FormControl('', [Validators.required]),
    })
    this.resetData();
  }

  saveShedule() {
    if (this.registerSheduleForm.invalid) {
      this.messageService.shortMessage('Los campos marcados en rojo deben ser verificados');
      this.hasErrors = true;
      return;
    }

    const data: SheduleModel = this.registerSheduleForm.value;
    data.hours = this.registerSheduleForm.get('hours').value;
    if (this.sheduleSelected) {
      this.apiService.editShedule(data, this.sheduleSelected._id).subscribe(
        (response: ApiResponse<any>) => {
          this.messageService.shortMessage(response.message);
          this.registerSheduleForm.reset();
          this.resetData();
          this.getShedules();
        },
        (error: any) => {
          this.messageService.shortMessage(error.error.message);
        }
      )
      return;
    }

    this.apiService.saveShedule(data).subscribe(
      (response: ApiResponse<any>) => {
        this.messageService.shortMessage(response.message);
        this.registerSheduleForm.reset();
        this.resetData();
        this.getShedules();
      },
      (error: any) => {
        this.messageService.shortMessage(error.error.message);
      }
    )
  }

  getEmployeeSelected(event: MatSelectChange) {
    this.apiService.getOneEmployee(event.value).subscribe(
      (response: ApiResponse<EmployeeModel>) => {
        this.registerSheduleForm.get('firstName').setValue(response.data[0].firstName);
        this.registerSheduleForm.get('firstLastname').setValue(response.data[0].firstLastname);
        this.registerSheduleForm.get('category').setValue(response.data[0].category);
      }
    )
  }

  setHours(event: MatSelectChange) {
    const hours = this.turns.find(item => item._id == event.value);
    this.registerSheduleForm.get('hours').setValue(`${hours.timeStart} - ${hours.timeEnd}`);
  }

  getData() {
    this.registerSheduleForm.disable();
    forkJoin([
      this.apiService.getTurns(0, 1000),
      this.apiService.getCategories(0, 1000),
      this.apiService.getEmployees(0, 1000)
    ]).subscribe(
      (response: any) => {
        this.registerSheduleForm.enable();
        this.registerSheduleForm.get('firstName').disable();
        this.registerSheduleForm.get('firstLastname').disable();
        this.registerSheduleForm.get('category').disable();
        this.registerSheduleForm.get('hours').disable();
        this.turns = response[0].items;
        this.categoriesList = response[1].items;
        this.employees = response[2].items;
      }
    )
  }

  goToDelete(element: SheduleModel) {
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
          this.apiService.deleteShedule(element._id).subscribe(
            (response: ApiResponse<CategoryModel>) => {
              this.messageService.shortMessage(response.message);
              this.getShedules();
            },
            (error: ApiErrorModel) => {
              this.messageService.shortMessage(error.error.message);
            }
          )
        }
      }
    );
  }

  getItemToEdit(element) {

  }

  getShedules(event?: any) {
    const pageIndex = event ? event.pageIndex * this.pageSize : this.pageIndex;
    const pageSize = event ? event.pageSize : this.pageSize;
    this.apiService.getShedules(pageIndex, pageSize).subscribe(
      (response: ApiResponse<any>) => {
        this.dataSource = new MatTableDataSource<any>(response.items);
        this.length = response.totalItems;
      },
      (error: any) => {
        this.messageService.shortMessage(error.error.message);
      }
    )
  }

  resetData() {
    this.hasErrors = false;
    this.pageIndex = consts.pageIndex;
    this.pageSize = consts.pageSize;
    this.pageSizeOptions = consts.pageSizeOptions;
    this.length = 0;
    this.registerSheduleForm.get('firstName').disable();
    this.registerSheduleForm.get('firstLastname').disable();
    this.registerSheduleForm.get('category').disable();
    this.registerSheduleForm.get('hours').disable();
  }

}
