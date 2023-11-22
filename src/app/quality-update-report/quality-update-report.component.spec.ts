import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityUpdateReportComponent } from './quality-update-report.component';

describe('QualityUpdateReportComponent', () => {
  let component: QualityUpdateReportComponent;
  let fixture: ComponentFixture<QualityUpdateReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualityUpdateReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityUpdateReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
