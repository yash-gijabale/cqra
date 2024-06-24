import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionSurveyReportComponent } from './inspection-survey-report.component';

describe('InspectionSurveyReportComponent', () => {
  let component: InspectionSurveyReportComponent;
  let fixture: ComponentFixture<InspectionSurveyReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionSurveyReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionSurveyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
