import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogConfirmComponent } from 'src/app/components/dialog-confirm/dialog-confirm.component';
import { ApiErrorModel } from 'src/app/models/ApiErrorModel';
import { ApiResponse } from 'src/app/models/ApiResponse';
import { ApiService } from 'src/app/services/api.service';
import { MessageService } from 'src/app/services/message.service';
import { TurnModel } from 'src/app/models/TurnModel';

@Component({
  selector: 'turnapp-settings-shedules-view',
  templateUrl: './settings-shedules-view.component.html',
  styleUrls: ['./settings-shedules-view.component.scss']
})
export class SettingsShedulesViewComponent implements OnInit {

  public turnForm: FormGroup;
  public turnSelected: TurnModel;
  public pageIndex: number = 0;
  public pageSize: number = 10;
  public displayedColumns: string[] = ['id', 'name', 'timeStart', 'timeEnd', 'actions'];
  public dataSource = new MatTableDataSource<any>([]);
  public length: number = 0;
  public selection = new SelectionModel<any>(true, []);
  public pageSizeOptions: Array<number> = [5, 10, 15];
  public hasErrors: boolean;

  constructor(
    private messageService: MessageService,
    private apiService: ApiService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.getTurns();
  }

  buildForm() {
    this.turnForm = null;
    this.turnForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      timeStart: new FormControl('', [Validators.required]),
      timeEnd: new FormControl('', [Validators.required]),
    });
    this.turnSelected = null;
    this.hasErrors = false;
  }

  saveTurn() {
    if (this.turnForm.invalid) {
      this.messageService.shortMessage('Los campos marcados en rojo deben ser verificados');
      this.hasErrors = true;
      return;
    }

    if (this.turnSelected) {
      this.apiService.editTurn(this.turnForm.value, this.turnSelected._id).subscribe(
        (response: ApiResponse<any>) => {
          this.messageService.shortMessage(response.message);
          this.buildForm();
          this.getTurns();
        },
        (error: any) => {
          this.messageService.shortMessage(error.error.message);
        }
      )
      return;
    }

    this.apiService.saveTurn(this.turnForm.value).subscribe(
      (response: ApiResponse<any>) => {
        this.messageService.shortMessage(response.message);
        this.buildForm();
        this.getTurns();
      },
      (error: any) => {
        this.messageService.shortMessage(error.error.message);
      }
    )
  }

  getTurns() {
    this.apiService.getTurns().subscribe(
      (response: ApiResponse<any>) => {
        this.dataSource = new MatTableDataSource<any>(response.items);
        this.length = this.dataSource.data.length;
      },
      (error: any) => {
        this.messageService.shortMessage(error.error.message);
      }
    )
  }

  goToDelete(element: TurnModel) {
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
          this.apiService.deleteTurn(element._id).subscribe(
            (response: ApiResponse<TurnModel>) => {
              this.messageService.shortMessage(response.message);
              this.getTurns();
            },
            (error: ApiErrorModel) => {
              this.messageService.shortMessage(error.error.message);
            }
          )
        }
      }
    );
  }

  getItemToEdit(element: TurnModel) {
    this.turnSelected = element;
    this.turnForm.patchValue(this.turnSelected);
  }

  cutString(value: string, length?: number) {
    return value.substring(0, length | 5);
  }

}
