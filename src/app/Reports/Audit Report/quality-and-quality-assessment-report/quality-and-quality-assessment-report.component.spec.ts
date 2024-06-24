import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityAndQualityAssessmentReportComponent } from './quality-and-quality-assessment-report.component';

describe('QualityAndQualityAssessmentReportComponent', () => {
  let component: QualityAndQualityAssessmentReportComponent;
  let fixture: ComponentFixture<QualityAndQualityAssessmentReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualityAndQualityAssessmentReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityAndQualityAssessmentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
