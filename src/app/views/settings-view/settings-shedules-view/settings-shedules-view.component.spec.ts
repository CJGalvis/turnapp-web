import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsShedulesViewComponent } from './settings-shedules-view.component';

describe('SettingsShedulesViewComponent', () => {
  let component: SettingsShedulesViewComponent;
  let fixture: ComponentFixture<SettingsShedulesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsShedulesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsShedulesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
