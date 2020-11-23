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

  getCurrent() {
    const endpoint: string = `/auth/tenant/current`;
    const url: string = `${this.API}${endpoint}`;
    return this.http.get(url);
  }

  getEmployees(pageIndex: number, pageSize: number): Observable<ApiResponse<EmployeeModel>> {
    const endpoint: string = `/employees/get?skip=${pageIndex}&limit=${pageSize}`;
    const url: string = `${this.API}${endpoint}`;
    return this.http.get<ApiResponse<EmployeeModel>>(url);
  }

  getEmployeesFilter(filter: any, pageIndex: number, pageSize: number): Observable<ApiResponse<EmployeeModel>> {
    const endpoint: string = `/employees/filters/get?skip=${pageIndex}&limit=${pageSize}`;
    const url: string = `${this.API}${endpoint}`;
    return this.http.post<ApiResponse<EmployeeModel>>(url, filter);
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

  getTurns(pageIndex: number, pageSize: number): Observable<any> {
    const endpoint: string = `/turns/get?skip=${pageIndex}&limit=${pageSize}`;
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

  getCategories(pageIndex: number, pageSize: number): Observable<any> {
    const endpoint: string = `/categories/get?skip=${pageIndex}&limit=${pageSize}`;
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

  getIdentificationTypes(pageIndex: number, pageSize: number) {
    const endpoint: string = `/identification-types/get?skip=${pageIndex}&limit=${pageSize}`;
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

  getShedules(pageIndex: number, pageSize: number) {
    const endpoint: string = `/shedules/get?skip=${pageIndex}&limit=${pageSize}`;
    const url: string = `${this.API}${endpoint}`;
    return this.http.get<ApiResponse<any>>(url);
  }

  deleteShedule(code: string): Observable<any> {
    const endpoint: string = `/shedules/delete/${code}`;
    const url: string = `${this.API}${endpoint}`;
    return this.http.get<ApiResponse<CategoryModel>>(url);
  }

  editShedule(data: IdentificationTypeModel, code: string): Observable<any> {
    const endpoint: string = `/shedules/put/${code}`;
    const url: string = `${this.API}${endpoint}`;
    return this.http.put<ApiResponse<CategoryModel>>(url, data);
  }

  saveShedule(turn: any): Observable<any> {
    const endpoint: string = `/shedules/new`;
    const url: string = `${this.API}${endpoint}`;
    return this.http.post<ApiResponse<any>>(url, turn);
  }
}
