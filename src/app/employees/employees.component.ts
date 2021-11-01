import { Component, OnInit } from '@angular/core';
import {Employee} from '../employee';
import {EmployeeService} from '../employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employeeToCreate: Employee = {name: '', role: ''};
  selectedEmployee?: Employee;
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    // TODO
  }

  onSelect(employee: Employee): void {
    // TODO
  }

  getEmployees(): void {
    // TODO
  }

  onDelete(employee: Employee): void {
    // TODO
  }

  onCreate(): void {
    // TODO
  }
}
