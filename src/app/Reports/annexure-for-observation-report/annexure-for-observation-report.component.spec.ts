import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnexureForObservationReportComponent } from './annexure-for-observation-report.component';

describe('AnnexureForObservationReportComponent', () => {
  let component: AnnexureForObservationReportComponent;
  let fixture: ComponentFixture<AnnexureForObservationReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnexureForObservationReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnexureForObservationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
