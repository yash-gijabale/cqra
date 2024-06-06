import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityInspectionParametersReportComponent } from './quality-inspection-parameters-report.component';

describe('QualityInspectionParametersReportComponent', () => {
  let component: QualityInspectionParametersReportComponent;
  let fixture: ComponentFixture<QualityInspectionParametersReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualityInspectionParametersReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityInspectionParametersReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
