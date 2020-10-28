import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/ApiResponse';
import { EmployeeModel } from '../models/EmployeeModel';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API: string;

  constructor(private http: HttpClient) {
    this.API = environment.API;
  }

  getEmployees(pageIndex: number, pageSize: number): Observable<ApiResponse<EmployeeModel>> {
    const endpoint: string = `/employees/get?skip=${pageIndex}&limit=${pageSize}`;
    const url: string = `${this.API}${endpoint}`;
    return this.http.get<ApiResponse<EmployeeModel>>(url);
  }

  saveEmployee(data: EmployeeModel): Observable<any> {
    const endpoint: string = `/employees/new`;
    const url: string = `${this.API}${endpoint}`;
    return this.http.post<ApiResponse<EmployeeModel>>(url, data);
  }

  editEmployee(data: EmployeeModel, code: string): Observable<any> {
    const endpoint: string = `/employees/put/${code}`;
    const url: string = `${this.API}${endpoint}`;
    return this.http.put<ApiResponse<EmployeeModel>>(url, data);
  }

  deleteEmployee(code: string): Observable<any> {
    const endpoint: string = `/employees/delete/${code}`;
    const url: string = `${this.API}${endpoint}`;
    return this.http.delete<ApiResponse<EmployeeModel>>(url);
  }
}
