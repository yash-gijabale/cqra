import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInspectionSurveyReportComponent } from './create-inspection-survey-report.component';

describe('CreateInspectionSurveyReportComponent', () => {
  let component: CreateInspectionSurveyReportComponent;
  let fixture: ComponentFixture<CreateInspectionSurveyReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateInspectionSurveyReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInspectionSurveyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
