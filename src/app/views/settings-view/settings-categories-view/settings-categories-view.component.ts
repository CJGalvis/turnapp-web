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

@Component({
  selector: 'turnapp-settings-categories-view',
  templateUrl: './settings-categories-view.component.html',
  styleUrls: ['./settings-categories-view.component.scss']
})
export class SettingsCategoriesViewComponent implements OnInit {

  public categoryForm: FormGroup;
  public categorySelected: CategoryModel;
  public pageIndex: number = 0;
  public pageSize: number = 10;
  public displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
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

  getCategories() {
    this.apiService.getCategories().subscribe(
      (response: ApiResponse<any>) => {
        this.dataSource = new MatTableDataSource<any>(response.items);
        this.length = this.dataSource.data.length;
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
