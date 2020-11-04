import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditTurnComponent } from './dialog-edit-turn.component';

describe('DialogEditTurnComponent', () => {
  let component: DialogEditTurnComponent;
  let fixture: ComponentFixture<DialogEditTurnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEditTurnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditTurnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
