import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Employee} from './employee';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    // TODO
    return null;
  }

  deleteEmployee(id: number): Observable<void> {
    // TODO
    return null;
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    // TODO
    return null;
  }

  createEmployee(employee: Employee): Observable<Employee> {
    // TODO
    return null;
  }
}
