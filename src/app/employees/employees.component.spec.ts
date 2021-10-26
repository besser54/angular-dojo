import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {EmployeesComponent} from './employees.component';
import {EmployeeService} from '../employee.service';
import {Observable, of} from 'rxjs';
import {Employee} from '../employee';
import {AppComponent} from '../app.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {EmployeeDetailComponent} from '../employee-detail/employee-detail.component';
import {MockComponent} from 'ng-mocks';
import {By} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

describe('EmployeesComponent', () => {
  let component: EmployeesComponent;
  let fixture: ComponentFixture<EmployeesComponent>;
  let employeeDetailComponent: EmployeeDetailComponent;
  const mockedEmployeeService = jasmine.createSpyObj('EmployeeService',
    ['getEmployees', 'deleteEmployee', 'updateEmployee', 'createEmployee']);
  const emp: Employee = {id: 2, name: 'Name', role: 'Arbeiter'};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeesComponent, MockComponent(EmployeeDetailComponent)],
      providers: [{provide: EmployeeService, useValue: mockedEmployeeService}],
      imports: [FormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    mockedEmployeeService.getEmployees.and.returnValue(of([]));
    fixture = TestBed.createComponent(EmployeesComponent);
    component = fixture.componentInstance;

    employeeDetailComponent = fixture.debugElement.query(By.css('app-employee-detail')).componentInstance as EmployeeDetailComponent;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.employees.length).toEqual(0);
  });

  it('ngOnInit should call getEmployees and save result', () => {
    mockedEmployeeService.getEmployees.and.returnValue(of([emp]));

    component.ngOnInit();
    expect(mockedEmployeeService.getEmployees).toHaveBeenCalled();
    expect(component.employees.length).toEqual(1);
    expect(component.employees[0]).toEqual(emp);
  });

  it('onSelect should set selectedEmployee', () => {
    component.onSelect(emp);
    expect(component.selectedEmployee).toEqual(emp);
  });

  it('onDelete should remove Employee and call deleteEmployee with id', () => {
    const secondEmp: Employee = {id: 10, name: 'A', role: 'B'};
    component.employees = [emp, secondEmp];
    mockedEmployeeService.deleteEmployee.and.returnValue(of());

    component.onDelete(emp);

    expect(component.employees.length).toEqual(1);
    expect(component.employees[0]).toEqual(secondEmp);
    expect(mockedEmployeeService.deleteEmployee).toHaveBeenCalledWith(emp.id);
  });

  it('onCreate should create employeeToCreate, add result and set employeeToCreate to default', () => {
    const employeeToCreate: Employee = {name: 'A', role: 'B'};
    component.employeeToCreate = employeeToCreate;
    const resultEmp: Employee = {id: 1, name: employeeToCreate.name, role: employeeToCreate.role};
    mockedEmployeeService.createEmployee.and.returnValue(of(resultEmp));

    component.onCreate();

    expect(component.employees.length).toEqual(1);
    expect(component.employees[0]).toEqual(resultEmp);
    expect(mockedEmployeeService.createEmployee).toHaveBeenCalledWith(employeeToCreate);
    expect(component.employeeToCreate).toEqual({name: '', role: ''});
  });

  it('should show name and role of employeeToCreate in inputs', fakeAsync(() => {
    const employeeToCreate: Employee = {name: 'A', role: 'B'};
    component.employeeToCreate = employeeToCreate;
    fixture.detectChanges();
    tick();

    const nameInput = fixture.debugElement.nativeElement.querySelector('#createInputName');
    const roleInput = fixture.debugElement.nativeElement.querySelector('#createInputRole');

    expect(nameInput.value).toEqual(employeeToCreate.name);
    expect(roleInput.value).toEqual(employeeToCreate.role);
  }));

  it('should modify employeeToCreate when inputs change', fakeAsync(() => {
    const nameInput = fixture.debugElement.nativeElement.querySelector('#createInputName') as HTMLInputElement;
    const roleInput = fixture.debugElement.nativeElement.querySelector('#createInputRole');

    nameInput.value = 'Test1';
    roleInput.value = 'Test2';
    nameInput.dispatchEvent(new Event('input'));
    roleInput.dispatchEvent(new Event('input'));
    tick();

    expect(component.employeeToCreate.name).toEqual('Test1');
    expect(component.employeeToCreate.role).toEqual('Test2');
  }));

  it('createButton should Call onCreate', fakeAsync(() => {
    spyOn(component, 'onCreate');

    const createButton = fixture.debugElement.nativeElement.querySelector('#createButton');
    createButton.click();
    tick();
    expect(component.onCreate).toHaveBeenCalledWith();
  }));

  it('should contain a valid li-Element (p with name, p with role, button) for each employee', () => {
    const employees: Employee[] = [{id: 1, name: 'A', role: 'A'}, {id: 2, name: 'D', role: 'D'}, {id: 3, name: 'G', role: 'G'}];
    component.employees = employees;
    fixture.detectChanges();

    const lis = fixture.debugElement.nativeElement.querySelectorAll('li');
    expect(lis.length).toEqual(employees.length);

    for (let i = 0; i < lis.length; i++) {
      const ps = lis[i].querySelectorAll('p');
      expect(ps.length).toEqual(2);
      expect(ps[0].textContent).toContain(employees[i].name);
      expect(ps[1].textContent).toContain(employees[i].role);

      expect(lis[i].querySelector('button')).not.toBe(null);

      expect(lis[i].classList).not.toContain('selected');
    }
  });

  it('should call onSelect when li clicked', fakeAsync(() => {
    const employees: Employee[] = [{id: 1, name: 'A', role: 'A'}];
    component.employees = employees;
    fixture.detectChanges();

    spyOn(component, 'onSelect');

    const li = fixture.debugElement.nativeElement.querySelector('li');
    li.click();
    tick();
    expect(component.onSelect).toHaveBeenCalledWith(employees[0]);
  }));

  it('should add \'selected\' as css-class when li clicked', fakeAsync(() => {
    const employees: Employee[] = [{id: 1, name: 'A', role: 'A'}];
    component.employees = employees;
    fixture.detectChanges();

    const li = fixture.debugElement.nativeElement.querySelector('li');
    li.click();
    tick();
    fixture.detectChanges();
    expect(li.classList).toContain('selected');
  }));

  it('deleteButton in li should Call onDelete', fakeAsync(() => {
    const employees: Employee[] = [{id: 1, name: 'A', role: 'A'}];
    component.employees = employees;
    fixture.detectChanges();

    spyOn(component, 'onDelete');

    const deleteButton = fixture.debugElement.nativeElement.querySelector('li').querySelector('button');
    deleteButton.click();
    tick();
    expect(component.onDelete).toHaveBeenCalledWith(employees[0]);
  }));

  it('should have the employee-detail component with selectedEmployee as input', async(() => {
    const employees: Employee[] = [{id: 1, name: 'A', role: 'A'}];
    component.employees = employees;
    component.selectedEmployee = employees[0];
    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement.querySelector('app-employee-detail')).not.toBe(null);
    expect(employeeDetailComponent.employee).toEqual(employees[0]);
  }));

  it('should call onSelect with undefined when child component emits event', async(() => {
    spyOn(component, 'onSelect');

    employeeDetailComponent.closeOutput.emit();
    expect(component.onSelect).toHaveBeenCalledWith(undefined);
  }));
});
