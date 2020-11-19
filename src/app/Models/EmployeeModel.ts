import { CategoryModel } from './CategoryModel';

export interface EmployeeModel {
    code: string;
    identificationNumber?: string;
    identificationType?: string;
    firstName: string;
    seconName?: string;
    firstLastname: string;
    seconLastname?: string;
    email?: string;
    category: CategoryModel;
    created?: Date;
    position?: number;
}