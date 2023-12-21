import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectChecklistAllocationComponent } from './project-checklist-allocation.component';

describe('ProjectChecklistAllocationComponent', () => {
  let component: ProjectChecklistAllocationComponent;
  let fixture: ComponentFixture<ProjectChecklistAllocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectChecklistAllocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectChecklistAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
