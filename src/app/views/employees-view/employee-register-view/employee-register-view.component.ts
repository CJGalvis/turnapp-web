import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { CategoryModel } from 'src/app/models/CategoryModel';
import { EmployeeModel } from 'src/app/models/EmployeeModel';
import { ApiService } from 'src/app/services/api.service';
import { MessageService } from 'src/app/services/message.service';
import { consts } from 'src/app/const';
import { GlobalService } from 'src/app/services/global.service';

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
  public isRunning: boolean;

  constructor(
    private messageService: MessageService,
    private apiService: ApiService,
    private globalService: GlobalService
  ) { }

  ngOnInit(): void {
    this.globalService.getRunning().subscribe(value => this.isRunning = value);
    this.buildFormRegister();
    this.getDataInit();
  }

  buildFormRegister() {
    this.registerEmployeeForm = new FormGroup({
      identificationNumber: new FormControl('', [Validators.required, Validators.pattern(consts.numbersRegex)]),
      identificationType: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required, Validators.pattern(consts.lettersRegex)]),
      seconName: new FormControl('', [Validators.pattern(consts.lettersRegex)]),
      firstLastname: new FormControl('', [Validators.required, Validators.pattern(consts.lettersRegex)]),
      seconLastname: new FormControl('', [Validators.pattern(consts.lettersRegex)]),
      email: new FormControl('', [Validators.required, Validators.pattern(consts.emailRegex)]),
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
    this.registerEmployeeForm.disable();
    this.apiService.saveEmployee(newEmployee).subscribe(
      (response: any) => {
        this.registerEmployeeForm.enable();
        this.messageService.shortMessage(response.message);
        this.buildFormRegister();
      },
      (error: any) => {
        this.registerEmployeeForm.enable();
        this.messageService.shortMessage(error.error.message);
      }
    )
  }

  getDataInit() {
    forkJoin([
      this.apiService.getCategories(0, 1000),
      this.apiService.getIdentificationTypes(0, 1000)
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
