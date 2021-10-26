import { TestBed } from '@angular/core/testing';

import { EmployeeService } from './employee.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Employee} from './employee';
import {HttpClient} from '@angular/common/http';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let employee: Employee;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmployeeService]
    });
    service = TestBed.inject(EmployeeService);
    httpMock = TestBed.get(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getEmployees should call http GET and return result', () => {
    employee = {id: 1, name: 'Test', role: 'Chef'};

    service.getEmployees().subscribe((emp) => {
      expect(emp.length).toEqual(1);
      expect(emp[0]).toEqual(employee);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/v1/employees');
    expect(req.request.method).toEqual('GET');
    httpMock.verify();

    req.flush([employee]);
  });

  it('deleteEmployees should call http DELETE with given id', () => {
    const id = 8;

    service.deleteEmployee(id).subscribe();

    const req = httpMock.expectOne('http://localhost:8080/api/v1/employees/' + id);
    expect(req.request.method).toEqual('DELETE');
    httpMock.verify();
  });

  it('updateEmployees should call http PUT with given employee and return result', () => {
    employee = {id: 8, name: 'Test', role: 'Boss'};

    service.updateEmployee(employee).subscribe((emp) => {
      expect(emp.role).toEqual(employee.role);
      expect(emp.name).toEqual(employee.name);
      expect(emp.id).toEqual(employee.id);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/v1/employees/' + employee.id);
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual(employee);
    httpMock.verify();

    req.flush(employee);
  });

  it('createEmployee should call http POST with given employee and return result', () => {
    employee = {name: 'Test', role: 'Boss'};

    service.createEmployee(employee).subscribe((emp) => {
      expect(emp.role).toEqual(employee.role);
      expect(emp.name).toEqual(employee.name);
      expect(emp.id).toBeDefined();
    });

    const req = httpMock.expectOne('http://localhost:8080/api/v1/employees');
    expect(req.request.method).toEqual('POST');
    httpMock.verify();

    req.flush({id: 1, name: employee.name, role: employee.role});
  });
});
