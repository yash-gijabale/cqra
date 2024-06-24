import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityImprovmentReportComponent } from './opportunity-improvment-report.component';

describe('OpportunityImprovmentReportComponent', () => {
  let component: OpportunityImprovmentReportComponent;
  let fixture: ComponentFixture<OpportunityImprovmentReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpportunityImprovmentReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityImprovmentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
