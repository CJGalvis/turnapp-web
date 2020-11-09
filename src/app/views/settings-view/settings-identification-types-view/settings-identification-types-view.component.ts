import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogConfirmComponent } from 'src/app/components/dialog-confirm/dialog-confirm.component';
import { ApiErrorModel } from 'src/app/models/ApiErrorModel';
import { ApiResponse } from 'src/app/models/ApiResponse';
import { IdentificationTypeModel } from 'src/app/models/IdentificationTypeModel';
import { ApiService } from 'src/app/services/api.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'turnapp-settings-identification-types-view',
  templateUrl: './settings-identification-types-view.component.html',
  styleUrls: ['./settings-identification-types-view.component.scss']
})
export class SettingsIdentificationTypesViewComponent implements OnInit {

  public identificationForm: FormGroup;
  public identificationSelected: IdentificationTypeModel;
  public pageIndex: number = 0;
  public pageSize: number = 10;
  public displayedColumns: string[] = ['id', 'value', 'description', 'actions'];
  public dataSource = new MatTableDataSource<any>([]);
  public length: number = 0;
  public selection = new SelectionModel<any>(true, []);
  public pageSizeOptions: Array<number> = [5, 10, 15];

  constructor(
    private messageService: MessageService,
    private apiService: ApiService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
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
  }

  saveIdentification() {
    if (this.identificationForm.invalid) {
      this.messageService.shortMessage('Los campos marcados en rojo deben ser verificados');
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

  getIdentificationTypes() {
    this.apiService.getIdentificationTypes().subscribe(
      (response: ApiResponse<any>) => {
        this.dataSource = new MatTableDataSource<any>(response.items);
        this.length = this.dataSource.data.length;
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
        message: '¿Está seguro de querer eliminar a este empleado?'
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
