import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQualityProcedureAmendmentReportComponent } from './create-quality-procedure-amendment-report.component';

describe('CreateQualityProcedureAmendmentReportComponent', () => {
  let component: CreateQualityProcedureAmendmentReportComponent;
  let fixture: ComponentFixture<CreateQualityProcedureAmendmentReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateQualityProcedureAmendmentReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateQualityProcedureAmendmentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
