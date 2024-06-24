import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQualityAndQualityAssessmentReportComponent } from './create-quality-and-quality-assessment-report.component';

describe('CreateQualityAndQualityAssessmentReportComponent', () => {
  let component: CreateQualityAndQualityAssessmentReportComponent;
  let fixture: ComponentFixture<CreateQualityAndQualityAssessmentReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateQualityAndQualityAssessmentReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateQualityAndQualityAssessmentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
