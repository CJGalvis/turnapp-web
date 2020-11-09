import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/ApiResponse';
import { CategoryModel } from '../models/CategoryModel';
import { EmployeeModel } from '../models/EmployeeModel';
import { IdentificationTypeModel } from '../models/IdentificationTypeModel';
import { TurnModel } from '../models/TurnModel';

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

  getOneEmployee(code: string): Observable<any> {
    const endpoint: string = `/employees/get/${code}`;
    const url: string = `${this.API}${endpoint}`;
    return this.http.get<ApiResponse<EmployeeModel>>(url);
  }

  saveTurn(turn: any): Observable<any> {
    const endpoint: string = `/turns/new`;
    const url: string = `${this.API}${endpoint}`;
    return this.http.post<ApiResponse<any>>(url, turn);
  }

  getTurns(): Observable<any> {
    const endpoint: string = `/turns/get`;
    const url: string = `${this.API}${endpoint}`;
    return this.http.get<ApiResponse<any>>(url);
  }

  deleteTurn(code: string): Observable<any> {
    const endpoint: string = `/turns/delete/${code}`;
    const url: string = `${this.API}${endpoint}`;
    return this.http.delete<ApiResponse<TurnModel>>(url);
  }

  editTurn(data: TurnModel, code: string): Observable<any> {
    const endpoint: string = `/turns/put/${code}`;
    const url: string = `${this.API}${endpoint}`;
    return this.http.put<ApiResponse<TurnModel>>(url, data);
  }

  saveCategory(turn: any): Observable<any> {
    const endpoint: string = `/categories/new`;
    const url: string = `${this.API}${endpoint}`;
    return this.http.post<ApiResponse<any>>(url, turn);
  }

  getCategories(): Observable<any> {
    const endpoint: string = `/categories/get`;
    const url: string = `${this.API}${endpoint}`;
    return this.http.get<ApiResponse<any>>(url);
  }

  deleteCategory(code: string): Observable<any> {
    const endpoint: string = `/categories/delete/${code}`;
    const url: string = `${this.API}${endpoint}`;
    return this.http.get<ApiResponse<CategoryModel>>(url);
  }

  editCategory(data: CategoryModel, code: string): Observable<any> {
    const endpoint: string = `/categories/put/${code}`;
    const url: string = `${this.API}${endpoint}`;
    return this.http.put<ApiResponse<CategoryModel>>(url, data);
  }

  getIdentificationTypes() {
    const endpoint: string = `/identification-types/get`;
    const url: string = `${this.API}${endpoint}`;
    return this.http.get<ApiResponse<any>>(url);
  }

  deleteIdentification(code: string): Observable<any> {
    const endpoint: string = `/identification-types/delete/${code}`;
    const url: string = `${this.API}${endpoint}`;
    return this.http.get<ApiResponse<CategoryModel>>(url);
  }

  editIdentification(data: IdentificationTypeModel, code: string): Observable<any> {
    const endpoint: string = `/identification-types/put/${code}`;
    const url: string = `${this.API}${endpoint}`;
    return this.http.put<ApiResponse<CategoryModel>>(url, data);
  }

  saveIdentification(turn: any): Observable<any> {
    const endpoint: string = `/identification-types/new`;
    const url: string = `${this.API}${endpoint}`;
    return this.http.post<ApiResponse<any>>(url, turn);
  }
}
