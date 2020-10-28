import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeModel } from 'src/app/models/EmployeeModel';
import { ApiService } from 'src/app/services/api.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'turnapp-dialog-edit-employee',
  templateUrl: './dialog-edit-employee.component.html',
  styleUrls: ['./dialog-edit-employee.component.scss']
})
export class DialogEditEmployeeComponent implements OnInit {

  public registerEmployeeForm: FormGroup;
  public EmployeeSelected: EmployeeModel

  constructor(
    private messageService: MessageService,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: EmployeeModel,
    public dialogRef: MatDialogRef<any>
  ) { }

  ngOnInit(): void {
    this.buildFormRegister();
    this.EmployeeSelected = this.data;
    this.registerEmployeeForm.patchValue(this.EmployeeSelected);
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
    newEmployee.code = this.EmployeeSelected.code;

    this.apiService.editEmployee(newEmployee, this.EmployeeSelected.code).subscribe(
      (response: any) => {
        this.messageService.shortMessage(response.message);
        this.EmployeeSelected = null;
        this.buildFormRegister();
        this.dialogRef.close(true);
      },
      (error: any) => {
        this.messageService.shortMessage(error.error.message);
      }
    )
  }

}
