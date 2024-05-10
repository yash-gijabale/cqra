import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistMasterComponent } from './checklist-master.component';

describe('ChecklistMasterComponent', () => {
  let component: ChecklistMasterComponent;
  let fixture: ComponentFixture<ChecklistMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChecklistMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
