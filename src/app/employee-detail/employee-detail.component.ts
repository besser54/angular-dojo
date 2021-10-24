import {Component, Input, OnInit} from '@angular/core';
import {Employee} from '../employee';
import {EmployeeService} from '../employee.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  @Input() employee: Employee | undefined;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
  }

  onSave(employee: Employee): void {
    this.employeeService.updateEmployee(employee).subscribe();
  }

}
