import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogConfirmComponent } from 'src/app/components/dialog-confirm/dialog-confirm.component';
import { ApiErrorModel } from 'src/app/models/ApiErrorModel';
import { ApiResponse } from 'src/app/models/ApiResponse';
import { ApiService } from 'src/app/services/api.service';
import { MessageService } from 'src/app/services/message.service';
import { CategoryModel } from 'src/app/models/CategoryModel';
import { GlobalService } from 'src/app/services/global.service';
import { consts } from 'src/app/const';

@Component({
  selector: 'turnapp-settings-categories-view',
  templateUrl: './settings-categories-view.component.html',
  styleUrls: ['./settings-categories-view.component.scss']
})
export class SettingsCategoriesViewComponent implements OnInit {

  public categoryForm: FormGroup;
  public categorySelected: CategoryModel;
  public pageIndex: number = consts.pageIndex;
  public pageSize: number = consts.pageSize;
  public pageSizeOptions: Array<number> = consts.pageSizeOptions;
  public displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
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
    this.getCategories();
  }

  buildForm() {
    this.categoryForm = null;
    this.categoryForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
    this.categorySelected = null;
    this.hasErrors = false;
    this.pageIndex = consts.pageIndex;
    this.pageSize = consts.pageSize;
    this.pageSizeOptions = consts.pageSizeOptions;
  }

  saveCategory() {
    if (this.categoryForm.invalid) {
      this.messageService.shortMessage('Los campos marcados en rojo deben ser verificados');
      this.hasErrors = true;
      return;
    }

    if (this.categorySelected) {
      this.apiService.editCategory(this.categoryForm.value, this.categorySelected._id).subscribe(
        (response: ApiResponse<any>) => {
          this.messageService.shortMessage(response.message);
          this.buildForm();
          this.getCategories();
        },
        (error: any) => {
          this.messageService.shortMessage(error.error.message);
        }
      )
      return;
    }

    this.apiService.saveCategory(this.categoryForm.value).subscribe(
      (response: ApiResponse<any>) => {
        this.messageService.shortMessage(response.message);
        this.buildForm();
        this.getCategories();
      },
      (error: any) => {
        this.messageService.shortMessage(error.error.message);
      }
    )
  }

  getCategories(event?: any) {
    const pageIndex = event ? event.pageIndex * this.pageSize : this.pageIndex;
    const pageSize = event ? event.pageSize : this.pageSize;
    this.apiService.getCategories(pageIndex, pageSize).subscribe(
      (response: ApiResponse<any>) => {
        this.dataSource = new MatTableDataSource<any>(response.items);
        this.length = response.totalItems;
      },
      (error: any) => {
        this.messageService.shortMessage(error.error.message);
      }
    )
  }

  goToDelete(element: CategoryModel) {
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
          this.apiService.deleteCategory(element._id).subscribe(
            (response: ApiResponse<CategoryModel>) => {
              this.messageService.shortMessage(response.message);
              this.getCategories();
            },
            (error: ApiErrorModel) => {
              this.messageService.shortMessage(error.error.message);
            }
          )
        }
      }
    );
  }

  getItemToEdit(element: CategoryModel) {
    this.categorySelected = element;
    this.categoryForm.patchValue(this.categorySelected);
  }

  cutString(value: string, length?: number) {
    return value.substring(0, length | 5);
  }


}
