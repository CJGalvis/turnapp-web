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
import { consts } from 'src/app/const';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'turnapp-settings-shedules-view',
  templateUrl: './settings-shedules-view.component.html',
  styleUrls: ['./settings-shedules-view.component.scss']
})
export class SettingsShedulesViewComponent implements OnInit {

  public turnForm: FormGroup;
  public turnSelected: TurnModel;
  public pageIndex: number = consts.pageIndex;
  public pageSize: number = consts.pageSize;
  public pageSizeOptions: Array<number> = consts.pageSizeOptions;
  public displayedColumns: string[] = ['id', 'name', 'timeStart', 'timeEnd', 'actions'];
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
    this.pageIndex = consts.pageIndex;
    this.pageSize = consts.pageSize;
    this.pageSizeOptions = consts.pageSizeOptions;
    this.length = 0;
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

  getTurns(event?: any) {
    const pageIndex = event ? event.pageIndex * this.pageSize : this.pageIndex;
    const pageSize = event ? event.pageSize : this.pageSize;
    this.apiService.getTurns(pageIndex, pageSize).subscribe(
      (response: ApiResponse<any>) => {
        this.dataSource = new MatTableDataSource<any>(response.items);
        this.length = response.totalItems;
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
