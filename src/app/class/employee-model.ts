import { Employee } from '../interfaces/employee';
export class EmployeeModel implements Employee {
    id: number = 0;
    email:string = "";
    firstName:string = "";
    lastName:string = "";
    mobile:string = "";
    salary:string = "";
}
