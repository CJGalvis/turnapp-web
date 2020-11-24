import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogConfirmComponent } from 'src/app/components/dialog-confirm/dialog-confirm.component';
import { consts } from 'src/app/const';
import { ApiErrorModel } from 'src/app/models/ApiErrorModel';
import { ApiResponse } from 'src/app/models/ApiResponse';
import { IdentificationTypeModel } from 'src/app/models/IdentificationTypeModel';
import { ApiService } from 'src/app/services/api.service';
import { GlobalService } from 'src/app/services/global.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'turnapp-settings-identification-types-view',
  templateUrl: './settings-identification-types-view.component.html',
  styleUrls: ['./settings-identification-types-view.component.scss']
})
export class SettingsIdentificationTypesViewComponent implements OnInit {

  public identificationForm: FormGroup;
  public identificationSelected: IdentificationTypeModel;
  public pageIndex: number = consts.pageIndex;
  public pageSize: number = consts.pageSize;
  public pageSizeOptions: Array<number> = consts.pageSizeOptions;
  public displayedColumns: string[] = ['id', 'value', 'description', 'actions'];
  public dataSource = new MatTableDataSource<any>([]);
  public length: number = 0;
  public selection = new SelectionModel<any>(true, []);
  public hasErrors: boolean;
  public isRunning: boolean;

  constructor(
    private messageService: MessageService,
    private apiService: ApiService,
    private dialog: MatDialog,
    private globalService: GlobalService
  ) { }

  ngOnInit(): void {
    this.globalService.getRunning().subscribe(value => this.isRunning = value);
    this.buildForm();
    this.getIdentificationTypes();
  }

  buildForm() {
    this.identificationForm = null;
    this.identificationForm = new FormGroup({
      value: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
    this.identificationSelected = null;
    this.hasErrors = false;
    this.pageIndex = consts.pageIndex;
    this.pageSize = consts.pageSize;
    this.pageSizeOptions = consts.pageSizeOptions;
    this.length = 0;
  }

  saveIdentification() {
    if (this.identificationForm.invalid) {
      this.messageService.shortMessage('Los campos marcados en rojo deben ser verificados');
      this.hasErrors = true;
      return;
    }

    if (this.identificationSelected) {
      this.apiService.editIdentification(this.identificationForm.value, this.identificationSelected._id).subscribe(
        (response: ApiResponse<any>) => {
          this.messageService.shortMessage(response.message);
          this.buildForm();
          this.getIdentificationTypes();
        },
        (error: any) => {
          this.messageService.shortMessage(error.error.message);
        }
      )
      return;
    }

    this.apiService.saveIdentification(this.identificationForm.value).subscribe(
      (response: ApiResponse<any>) => {
        this.messageService.shortMessage(response.message);
        this.buildForm();
        this.getIdentificationTypes();
      },
      (error: any) => {
        this.messageService.shortMessage(error.error.message);
      }
    )
  }

  getIdentificationTypes(event?: any) {
    const pageIndex = event ? event.pageIndex * this.pageSize : this.pageIndex;
    const pageSize = event ? event.pageSize : this.pageSize;
    this.apiService.getIdentificationTypes(pageIndex, pageSize).subscribe(
      (response: ApiResponse<any>) => {
        this.dataSource = new MatTableDataSource<any>(response.items);
        this.length = response.totalItems;
      },
      (error: any) => {
        this.messageService.shortMessage(error.error.message);
      }
    )
  }

  goToDelete(element: IdentificationTypeModel) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '250px',
      data: {
        title: 'Confirmación',
        message: '¿Está seguro de querer eliminar este tipo de identificación?'
      }
    });

    dialogRef.afterClosed().subscribe(
      (result) => {
        if (result) {
          this.apiService.deleteIdentification(element._id).subscribe(
            (response: ApiResponse<IdentificationTypeModel>) => {
              this.messageService.shortMessage(response.message);
              this.getIdentificationTypes();
            },
            (error: ApiErrorModel) => {
              this.messageService.shortMessage(error.error.message);
            }
          )
        }
      }
    );
  }

  getItemToEdit(element: IdentificationTypeModel) {
    this.identificationSelected = element;
    this.identificationForm.patchValue(this.identificationSelected);
  }


  cutString(value: string, length?: number) {
    return value.substring(0, length | 5);
  }


}
