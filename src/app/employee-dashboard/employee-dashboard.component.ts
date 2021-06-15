import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ApiService } from '../services/api.service';
import { Employee } from '../interfaces/employee';
import { EmployeeModel } from '../class/employee-model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue!: FormGroup;
  employee: EmployeeModel = new EmployeeModel();

  constructor(private _formBuilder: FormBuilder, private _api: ApiService) {
  }

  ngOnInit(): void {
    this.formValue = this._formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      salary: ['']
    });
  }

  postEmployee() {
    this.employee.firstName = this.formValue.value.firstName;
    this.employee.lastName = this.formValue.value.lastName;
    this.employee.email = this.formValue.value.email;
    this.employee.mobile = this.formValue.value.mobile;
    this.employee.salary = this.formValue.value.salary;
    this._api.postAddEmployee(this.employee)
      .subscribe((resp) => {
        console.log(resp);
        alert("Registrado con éxito.");
      }, err => {
        console.error(err);
        alert("algo salió mal!.");
      });
  }
}
