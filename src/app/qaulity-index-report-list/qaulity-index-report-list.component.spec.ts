import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QaulityIndexReportListComponent } from './qaulity-index-report-list.component';

describe('QaulityIndexReportListComponent', () => {
  let component: QaulityIndexReportListComponent;
  let fixture: ComponentFixture<QaulityIndexReportListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QaulityIndexReportListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QaulityIndexReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
