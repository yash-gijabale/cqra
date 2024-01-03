import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateObservationTrackerReportComponent } from './create-observation-tracker-report.component';

describe('CreateObservationTrackerReportComponent', () => {
  let component: CreateObservationTrackerReportComponent;
  let fixture: ComponentFixture<CreateObservationTrackerReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateObservationTrackerReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateObservationTrackerReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
