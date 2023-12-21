import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTradeSequenceComponent } from './project-trade-sequence.component';

describe('ProjectTradeSequenceComponent', () => {
  let component: ProjectTradeSequenceComponent;
  let fixture: ComponentFixture<ProjectTradeSequenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectTradeSequenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTradeSequenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
