import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnaggingReportComponent } from './snagging-report.component';

describe('SnaggingReportComponent', () => {
  let component: SnaggingReportComponent;
  let fixture: ComponentFixture<SnaggingReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnaggingReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnaggingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
