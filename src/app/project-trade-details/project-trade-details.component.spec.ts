import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTradeDetailsComponent } from './project-trade-details.component';

describe('ProjectTradeDetailsComponent', () => {
  let component: ProjectTradeDetailsComponent;
  let fixture: ComponentFixture<ProjectTradeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectTradeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTradeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
