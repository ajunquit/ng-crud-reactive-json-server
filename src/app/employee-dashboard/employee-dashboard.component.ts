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

  showAdd: boolean = false;
  showUpdate: boolean = false;
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

  /**
   * flags condition buttons modals
   */
  clickAddEmployee() {
    this.showAdd = true; /* true for add new employee */
    this.showUpdate = false; /* set in false */
  }

  /**
   * save a employee.
   */
  postEmployee() {
    /**
     * set value from form control to model.
     */
    this.employee.firstName = this.formValue.value.firstName;
    this.employee.lastName = this.formValue.value.lastName;
    this.employee.email = this.formValue.value.email;
    this.employee.mobile = this.formValue.value.mobile;
    this.employee.salary = this.formValue.value.salary;

    /**
     * add model in service.
     */
    this._api.postAddEmployee(this.employee)
      .subscribe((resp) => {
        this.formValue.reset(); // se resetea el formulario reactivo.
        this.getEmployees();
        let cancelButton = document.getElementById("cancel");
        cancelButton?.click();
        this.formValue.reset();
        Swal.fire(
          'Registered!',
          'Your file has been registered.',
          'success'
        );
      }, err => {
        console.error(err);
        Swal.fire(
          'Ups!',
          'Something went bad.',
          'error'
        );
      });
  }

  /**
   * get list  employees .
   */
  getEmployees() {
    /**
     * get employees from service.
     */
    this._api.getListEmployees()
      .subscribe(resp => {
        this.employees = resp;
      }, err => {
        console.error(err);
        Swal.fire(
          'Ups!',
          'Something went bad.',
          'error'
        );
      });
  }

  /**
   * delete a employee by id.
   * @param id employee id.
   */
  deleteEmployee(id: number) {

    /* sweet alert */
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
          }, err => {
            console.error(err);
            Swal.fire(
              'Ups!',
              'Something went bad.',
              'error'
            );
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

  /**
   * for edit an employee.
   * @param employee model employee
   */
  onEdit(employee: Employee) {
    /* flags condition buttons modals*/
    this.showAdd = false;
    this.showUpdate = true;

    /* set values from model to formgroup */
    this.employee.id = employee.id;
    this.formValue.controls['firstName'].setValue(employee.firstName);
    this.formValue.controls['lastName'].setValue(employee.lastName);
    this.formValue.controls['email'].setValue(employee.email);
    this.formValue.controls['mobile'].setValue(employee.mobile);
    this.formValue.controls['salary'].setValue(employee.salary);
  }

  updateEmployee() {
    /**
     * set value from form control to model.
     */

    this.employee.firstName = this.formValue.value.firstName;
    this.employee.lastName = this.formValue.value.lastName;
    this.employee.email = this.formValue.value.email;
    this.employee.mobile = this.formValue.value.mobile;
    this.employee.salary = this.formValue.value.salary;

    /* */
    this._api.putUpdateEmployee(this.employee.id, this.employee)
      .subscribe(resp => {
        this.getEmployees();
        let cancelButton = document.getElementById("cancel");
        cancelButton?.click();
        this.formValue.reset();
        Swal.fire(
          'Updated!',
          'Your employee has been updated.',
          'success'
        );
      }, err => {
        console.error(err);
        Swal.fire(
          'Ups!',
          'Something went bad.',
          'error'
        );
      });

  }

}
