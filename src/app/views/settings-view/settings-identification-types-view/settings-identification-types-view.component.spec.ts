import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsIdentificationTypesViewComponent } from './settings-identification-types-view.component';

describe('SettingsIdentificationTypesViewComponent', () => {
  let component: SettingsIdentificationTypesViewComponent;
  let fixture: ComponentFixture<SettingsIdentificationTypesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsIdentificationTypesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsIdentificationTypesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
