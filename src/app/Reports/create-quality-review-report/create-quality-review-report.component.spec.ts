import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQualityReviewReportComponent } from './create-quality-review-report.component';

describe('CreateQualityReviewReportComponent', () => {
  let component: CreateQualityReviewReportComponent;
  let fixture: ComponentFixture<CreateQualityReviewReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateQualityReviewReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateQualityReviewReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
