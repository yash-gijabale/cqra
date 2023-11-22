import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNcObservationCountReportComponent } from './create-nc-observation-count-report.component';

describe('CreateNcObservationCountReportComponent', () => {
  let component: CreateNcObservationCountReportComponent;
  let fixture: ComponentFixture<CreateNcObservationCountReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNcObservationCountReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNcObservationCountReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
