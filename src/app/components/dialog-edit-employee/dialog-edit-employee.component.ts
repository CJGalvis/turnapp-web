import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { CategoryModel } from 'src/app/models/CategoryModel';
import { EmployeeModel } from 'src/app/models/EmployeeModel';
import { ApiService } from 'src/app/services/api.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'turnapp-dialog-edit-employee',
  templateUrl: './dialog-edit-employee.component.html',
  styleUrls: ['./dialog-edit-employee.component.scss']
})
export class DialogEditEmployeeComponent implements OnInit {

  public editEmployeeForm: FormGroup;
  public turnSelected: EmployeeModel;
  public hasErrors: boolean;
  public categoriesList: Array<CategoryModel> = [];
  public identificationTypes: Array<any> = [];

  constructor(
    private messageService: MessageService,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: EmployeeModel,
    public dialogRef: MatDialogRef<any>
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.getDataInit();
    this.turnSelected = this.data;
    this.editEmployeeForm.patchValue(this.turnSelected);
  }

  buildForm() {
    this.editEmployeeForm = new FormGroup({
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
    if (this.editEmployeeForm.invalid) {
      this.messageService.shortMessage('Los campos marcados en rojo deben ser verificacos');
      this.hasErrors = true;
      return;
    }
    const newEmployee: EmployeeModel = {
      ...this.editEmployeeForm.value
    }
    newEmployee.code = this.turnSelected.code;

    this.apiService.editEmployee(newEmployee, this.turnSelected.code).subscribe(
      (response: any) => {
        this.messageService.shortMessage(response.message);
        this.turnSelected = null;
        this.buildForm();
        this.dialogRef.close(true);
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
