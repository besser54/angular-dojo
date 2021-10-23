import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Employee} from './employee';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

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
    return this.httpClient.get<Employee[]>(this.employeeUrl + '/employees')
      .pipe(
        catchError(error => of([] as Employee[]))
      );
  }
}
