import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistGroupMasterComponent } from './checklist-group-master.component';

describe('ChecklistGroupMasterComponent', () => {
  let component: ChecklistGroupMasterComponent;
  let fixture: ComponentFixture<ChecklistGroupMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChecklistGroupMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistGroupMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
