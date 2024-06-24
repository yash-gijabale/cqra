import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAuditObservationReportComponent } from './create-audit-observation-report.component';

describe('CreateAuditObservationReportComponent', () => {
  let component: CreateAuditObservationReportComponent;
  let fixture: ComponentFixture<CreateAuditObservationReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAuditObservationReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAuditObservationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
