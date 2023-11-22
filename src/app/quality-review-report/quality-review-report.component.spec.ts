import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityReviewReportComponent } from './quality-review-report.component';

describe('QualityReviewReportComponent', () => {
  let component: QualityReviewReportComponent;
  let fixture: ComponentFixture<QualityReviewReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualityReviewReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityReviewReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
