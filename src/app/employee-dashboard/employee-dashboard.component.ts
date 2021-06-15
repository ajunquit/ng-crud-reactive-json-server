import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ApiService } from '../services/api.service';
import { Employee } from '../interfaces/employee';
import { EmployeeModel } from '../class/employee-model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue!: FormGroup;
  employee: EmployeeModel = new EmployeeModel();
  employees: Employee[] = [];

  constructor(private _formBuilder: FormBuilder, private _api: ApiService) {
    this.getEmployees();
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

        this.formValue.reset(); // se resetea el formulario reactivo.
        this.getEmployees();
        let cancelButton = document.getElementById("cancel");
        cancelButton?.click();
        alert("Registrado con éxito.");
      }, err => {
        console.error(err);
        alert("algo salió mal!.");
      });
  }

  getEmployees() {
    this._api.getListEmployees()
      .subscribe(resp => {
        this.employees = resp;
      });
  }

  deleteEmployee(id: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        /* CODE FOR DELETE */
        this._api.deleteEmployee(id)
          .subscribe(resp => {
            console.log(resp);
            this.getEmployees();
          });
        /* END CODE FOR DELETE */
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Employee has been deleted.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })

  }

  onEdit(employee: Employee) {
    console.log(employee);
  }

}
