import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsCategoriesViewComponent } from './settings-categories-view.component';

describe('SettingsCategoriesViewComponent', () => {
  let component: SettingsCategoriesViewComponent;
  let fixture: ComponentFixture<SettingsCategoriesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsCategoriesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsCategoriesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
