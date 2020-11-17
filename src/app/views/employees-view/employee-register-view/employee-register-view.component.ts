import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { forkJoin } from 'rxjs';
import { ApiResponse } from 'src/app/models/ApiResponse';
import { CategoryModel } from 'src/app/models/CategoryModel';
import { EmployeeModel } from 'src/app/models/EmployeeModel';
import { ApiService } from 'src/app/services/api.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'turnapp-employee-register-view',
  templateUrl: './employee-register-view.component.html',
  styleUrls: ['./employee-register-view.component.scss']
})
export class EmployeeRegisterViewComponent implements OnInit {

  public registerEmployeeForm: FormGroup;
  public categoriesList: Array<CategoryModel> = [];
  public identificationTypes: Array<any> = [];
  public hasErrors: boolean;

  constructor(
    private messageService: MessageService,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.buildFormRegister();
    this.getDataInit();
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
    this.hasErrors = false;
  }

  saveEmployee() {
    if (this.registerEmployeeForm.invalid) {
      this.messageService.shortMessage('Los campos marcados en rojo deben ser verificacos');
      this.hasErrors = true;
      return;
    }
    const newEmployee: EmployeeModel = {
      ...this.registerEmployeeForm.value
    }
    this.apiService.saveEmployee(newEmployee).subscribe(
      (response: any) => {
        this.messageService.shortMessage(response.message);
        this.buildFormRegister();
      },
      (error: any) => {
        this.messageService.shortMessage(error.error.message);
      }
    )
  }

  getDataInit() {
    forkJoin([
      this.apiService.getCategories(),
      this.apiService.getIdentificationTypes()
    ]).subscribe(
      (response: any) => {
        this.categoriesList = response[0].items;
        this.identificationTypes = response[1].items;
      },
      (error: any) => {
        this.messageService.shortMessage(error.error.message);
      }
    )
  }

}
