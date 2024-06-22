import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingReportListComponent } from './training-report-list.component';

describe('TrainingReportListComponent', () => {
  let component: TrainingReportListComponent;
  let fixture: ComponentFixture<TrainingReportListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingReportListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
