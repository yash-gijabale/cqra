import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditObservationReportComponent } from './audit-observation-report.component';

describe('AuditObservationReportComponent', () => {
  let component: AuditObservationReportComponent;
  let fixture: ComponentFixture<AuditObservationReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditObservationReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditObservationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
