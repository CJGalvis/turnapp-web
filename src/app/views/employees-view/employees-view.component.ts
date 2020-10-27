import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeModel } from 'src/app/Models/EmployeeModel';

@Component({
  selector: 'app-employees-view',
  templateUrl: './employees-view.component.html',
  styleUrls: ['./employees-view.component.scss']
})
export class EmployeesViewComponent implements OnInit {

  public registerEmployeeForm: FormGroup;
  public searchEmployeeFrom: FormGroup;
  public pageIndex: number = 0;
  public pageSize: number = 10;
  public displayedColumns: string[] = ['select', 'code', 'name', 'lastname', 'category'];
  public dataSource = new MatTableDataSource<EmployeeModel>(ELEMENT_DATA);
  public selection = new SelectionModel<EmployeeModel>(true, []);
  public pageSizeOptions: Array<number> = [5, 10, 15];

  constructor() { }

  ngOnInit(): void {
    this.buildFormRegister();
    this.buildFormSearch();
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

  buildFormSearch() {
    this.searchEmployeeFrom = new FormGroup({
      code: new FormControl(''),
      firstName: new FormControl(''),
      firstLastname: new FormControl(''),
      category: new FormControl('TODAS'),
    })
  }

  saveEmployee() {

  }

  searchEmployee() {

  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: EmployeeModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

}

const ELEMENT_DATA: Array<EmployeeModel> = [
  { code: 'C123456G', firstName: 'Camilo', firstLastname: 'Galvis', category: 'Ventas' },
  { code: 'A654321M', firstName: 'Andres', firstLastname: 'Martinez', category: 'Admin' },
  { code: 'K123456M', firstName: 'Kaleth', firstLastname: 'Morales', category: 'Aseo' },
];

