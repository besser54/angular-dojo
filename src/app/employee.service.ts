import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Employee} from './employee';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employeeUrl = 'http://localhost:8080/api/v1';

  httpOptions = {
    headers: new HttpHeaders({ Accept: 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.employeeUrl + '/employees');
  }

  deleteEmployee(id: number): Observable<void> {
    return this.httpClient.delete<void>(this.employeeUrl + '/employees/' + id, this.httpOptions);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient.put<Employee>(this.employeeUrl + '/employees/' + employee.id,
      employee, this.httpOptions);
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(this.employeeUrl + '/employees',
      employee, this.httpOptions);
  }
}
