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

@Component({
  selector: 'turnapp-employee-register-view',
  templateUrl: './employee-register-view.component.html',
  styleUrls: ['./employee-register-view.component.scss']
})
export class EmployeeRegisterViewComponent implements OnInit {

  public registerEmployeeForm: FormGroup;

  constructor(
    private messageService: MessageService,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.buildFormRegister();
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

}
