import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {MockComponent} from 'ng-mocks';
import {EmployeeDetailComponent} from './employee-detail/employee-detail.component';
import {EmployeesComponent} from './employees/employees.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockComponent(EmployeesComponent)
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have the employees component', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-employees')).not.toBe(null);
  }));
});
