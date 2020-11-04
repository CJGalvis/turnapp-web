import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { forkJoin } from 'rxjs';
import { ApiErrorModel } from 'src/app/models/ApiErrorModel';
import { ApiResponse } from 'src/app/models/ApiResponse';
import { CategoryModel } from 'src/app/models/CategoryModel';
import { EmployeeModel } from 'src/app/models/EmployeeModel';
import { ApiService } from 'src/app/services/api.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-shedule-view',
  templateUrl: './shedule-view.component.html',
  styleUrls: ['./shedule-view.component.scss']
})
export class SheduleViewComponent implements OnInit {

  public employees: Array<EmployeeModel>;
  public registerSheduleForm: FormGroup;
  public now: Date = new Date;
  public turns: Array<any> = [];
  public categoriesList: Array<CategoryModel> = [];

  constructor(
    private messageService: MessageService,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.getEmployees();
    this.getData();
  }

  buildForm() {
    this.registerSheduleForm = new FormGroup({
      employeeCode: new FormControl('', [Validators.required]),
      firstName: new FormControl({ value: '', disabled: true }, [Validators.required]),
      firstLastname: new FormControl({ value: '', disabled: true }, [Validators.required]),
      category: new FormControl({ value: '', disabled: true }, [Validators.required]),
      date: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      hours: new FormControl({ value: '', disabled: true }, [Validators.required]),
    })
  }

  saveShedule() {

  }

  getEmployees(event?: any) {
    this.apiService.getEmployees(0, 100).subscribe(
      (response: ApiResponse<EmployeeModel>) => {
        this.employees = response.items;
      },
      (error: ApiErrorModel) => {
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
    forkJoin([
      this.apiService.getTurns(),
      this.apiService.getCategories()
    ]).subscribe(
      (response: any) => {
        this.turns = response[0].items;
        this.categoriesList = response[1].items;
      }
    )
  }

}
