import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQualityObservationReportComponent } from './create-quality-observation-report.component';

describe('CreateQualityObservationReportComponent', () => {
  let component: CreateQualityObservationReportComponent;
  let fixture: ComponentFixture<CreateQualityObservationReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateQualityObservationReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateQualityObservationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
