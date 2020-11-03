import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ApiResponse } from 'src/app/models/ApiResponse';
import { ApiService } from 'src/app/services/api.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'turnapp-settings-shedules-view',
  templateUrl: './settings-shedules-view.component.html',
  styleUrls: ['./settings-shedules-view.component.scss']
})
export class SettingsShedulesViewComponent implements OnInit {

  public turnForm: FormGroup;
  public pageIndex: number = 0;
  public pageSize: number = 10;
  public displayedColumns: string[] = ['id', 'name', 'timeStart', 'timeEnd', 'actions'];
  public dataSource = new MatTableDataSource<any>([]);
  public length: number = 0;
  public selection = new SelectionModel<any>(true, []);
  public pageSizeOptions: Array<number> = [5, 10, 15];

  constructor(
    private messageService: MessageService,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.getTurns();
  }

  buildForm() {
    this.turnForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      timeStart: new FormControl('', [Validators.required]),
      timeEnd: new FormControl('', [Validators.required]),
    });
  }

  saveTurn() {
    if (this.turnForm.invalid) {
      this.messageService.shortMessage('Los campos marcados en rojo deben ser verificados');
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
        this.length = response.totalItems;
      },
      (error: any) => {
        this.messageService.shortMessage(error.error.message);
      }
    )
  }

  goToDelete(element) {

  }

  getItemToEdit(element) {

  }

  cutString(value: string, length?: number) {
    return value.substring(0, length | 5);
  }

}
