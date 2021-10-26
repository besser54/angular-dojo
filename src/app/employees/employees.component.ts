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
    this.getEmployees();
  }

  onSelect(employee: Employee): void {
    this.selectedEmployee = employee;
  }

  getEmployees(): void {
    this.employeeService.getEmployees()
      .subscribe(employees => this.employees = employees);
  }

  onDelete(employee: Employee): void {
    this.employees = this.employees.filter(e => e !== employee);
    this.employeeService.deleteEmployee(employee.id).subscribe();
  }

  onCreate(): void {
    this.employeeService.createEmployee(this.employeeToCreate).subscribe(
      employee => {
        this.employees.push(employee);
        this.employeeToCreate = {name: '', role: ''};
      }
    );
  }
}
