import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Employee } from '../interfaces/employee';
import { Observable } from 'rxjs'; // observables
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _url: string = "http://localhost:3000";

  private _employees: Employee[] = [];

  constructor(private _http: HttpClient) {
    console.log("servicio api inicializado correctamente...");
  }

  postAddEmployee(employee: Employee): Observable<Employee> {
    return this._http.post<Employee>(`${this._url}/posts`, employee)
      .pipe(map((resp: Employee) => {
        return resp;
      }));
  }

  getListEmployees(): Observable<Employee[]> {
    return this._http.get<Employee[]>(`${this._url}/posts`)
      .pipe(map((resp: Employee[]) => {
        return resp;
      }));
  }

  deleteEmployee(id: number) {
    return this._http.delete<Employee>(`${this._url}/posts/${id}`)
      .pipe(map(resp => {
        return resp;
      }));
  }

  putUpdateEmployee(id: number, employee: Employee) {
    return this._http.put<Employee>(`${this._url}/posts/${id}`, employee)
      .pipe(map(resp => {
        return resp;
      }));
  }



}
