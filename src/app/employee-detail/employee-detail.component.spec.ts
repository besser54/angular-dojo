import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { EmployeeDetailComponent } from './employee-detail.component';
import {EmployeeService} from '../employee.service';
import {Employee} from '../employee';
import {of} from 'rxjs';
import {FormsModule} from '@angular/forms';

describe('EmployeeDetailComponent', () => {
  let component: EmployeeDetailComponent;
  let fixture: ComponentFixture<EmployeeDetailComponent>;
  const mockedEmployeeService = jasmine.createSpyObj('EmployeeService',
    ['getEmployees', 'deleteEmployee', 'updateEmployee', 'createEmployee']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeDetailComponent ],
      providers: [{provide: EmployeeService, useValue: mockedEmployeeService}],
      imports: [FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onSave should emit Event and call updateEmployee with employee', () => {
    const emp: Employee = {id: 10, name: 'A', role: 'B'};
    component.employee = emp;
    fixture.detectChanges();
    mockedEmployeeService.updateEmployee.and.returnValue(of(emp));

    spyOn(component.closeOutput, 'emit');
    component.onSave();

    expect(mockedEmployeeService.updateEmployee).toHaveBeenCalledWith(emp);
    expect(component.closeOutput.emit).toHaveBeenCalledWith();
  });

  it('should be empty when selected employee is undefined', () => {
    component.employee = undefined;
    fixture.detectChanges();

    expect(fixture.debugElement.nativeElement.children.length).toEqual(0);
  });

  it('should show name and role of selected employee in inputs', fakeAsync(() => {
    const emp: Employee = {id: 10, name: 'A', role: 'B'};
    component.employee = emp;
    fixture.detectChanges();
    tick();

    const nameInput = fixture.debugElement.nativeElement.querySelector('#employee-name') as HTMLInputElement;
    const roleInput = fixture.debugElement.nativeElement.querySelector('#employee-role');

    expect(nameInput.value).toEqual(emp.name);
    expect(roleInput.value).toEqual(emp.role);
  }));

  it('should update employee when inputs change', fakeAsync(() => {
    const emp: Employee = {id: 10, name: 'A', role: 'B'};
    component.employee = emp;
    fixture.detectChanges();
    tick();

    const nameInput = fixture.debugElement.nativeElement.querySelector('#employee-name') as HTMLInputElement;
    const roleInput = fixture.debugElement.nativeElement.querySelector('#employee-role');

    nameInput.value = 'Test1';
    roleInput.value = 'Test2';
    nameInput.dispatchEvent(new Event('input'));
    roleInput.dispatchEvent(new Event('input'));
    tick();

    expect(component.employee.name).toEqual('Test1');
    expect(component.employee.role).toEqual('Test2');
  }));

  it('saveButton should Call onSave', fakeAsync(() => {
    const emp: Employee = {id: 10, name: 'A', role: 'B'};
    component.employee = emp;
    fixture.detectChanges();

    spyOn(component, 'onSave');

    const createButton = fixture.debugElement.nativeElement.querySelector('#saveButton');
    createButton.click();
    tick();
    expect(component.onSave).toHaveBeenCalledWith();
  }));
});
