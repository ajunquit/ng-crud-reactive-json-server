import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Employee } from '../interfaces/employee';
import { Observable } from 'rxjs'; // observables
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _employees: Employee[] = [];

  constructor(private _http: HttpClient) {
    console.log("servicio api inicializado correctamente...");
  }

  postAddEmployee(employee: Employee): Observable<Employee> {
    return this._http.post<Employee>("http://localhost:3000/posts", employee)
      .pipe(map((resp: Employee) => {
        return resp;
      }));
  }

  getListEmployees():Observable<Employee[]> {
    const url = "http://localhost:3000/posts";
    return this._http.get<Employee[]>(url)
      .pipe(map((resp: Employee[]) => {
        return resp;
      }));
  }

}
