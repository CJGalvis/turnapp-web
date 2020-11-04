import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
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

  constructor(
    private messageService: MessageService,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.buildFormRegister();
    this.getCategories();
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

  saveEmployee() {
    if (this.registerEmployeeForm.invalid) {
      this.messageService.shortMessage('Los campos marcados en rojo deben ser verificacos');
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
