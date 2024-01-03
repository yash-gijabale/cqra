import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationTrackerReportComponent } from './observation-tracker-report.component';

describe('ObservationTrackerReportComponent', () => {
  let component: ObservationTrackerReportComponent;
  let fixture: ComponentFixture<ObservationTrackerReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservationTrackerReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservationTrackerReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
