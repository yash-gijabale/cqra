import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityIndexReportComponent } from './quality-index-report.component';

describe('QualityIndexReportComponent', () => {
  let component: QualityIndexReportComponent;
  let fixture: ComponentFixture<QualityIndexReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualityIndexReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityIndexReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
