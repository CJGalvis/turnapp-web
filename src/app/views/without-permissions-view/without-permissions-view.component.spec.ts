import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithoutPermissionsViewComponent } from './without-permissions-view.component';

describe('WithoutPermissionsViewComponent', () => {
  let component: WithoutPermissionsViewComponent;
  let fixture: ComponentFixture<WithoutPermissionsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithoutPermissionsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithoutPermissionsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
