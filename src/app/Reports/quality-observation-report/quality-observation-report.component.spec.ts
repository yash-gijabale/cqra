import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityObservationReportComponent } from './quality-observation-report.component';

describe('QualityObservationReportComponent', () => {
  let component: QualityObservationReportComponent;
  let fixture: ComponentFixture<QualityObservationReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualityObservationReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityObservationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
