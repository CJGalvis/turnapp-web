import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeRegisterViewComponent } from './employee-register-view.component';

describe('EmployeeRegisterViewComponent', () => {
  let component: EmployeeRegisterViewComponent;
  let fixture: ComponentFixture<EmployeeRegisterViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeRegisterViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeRegisterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
