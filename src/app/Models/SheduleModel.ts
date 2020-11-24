export interface SheduleModel {
    _id?: string;
    employeeCode: string;
    dateStart: Date;
    dateEnd: Date;
    type: Date;
    hours: string;
    tenant: string;
}