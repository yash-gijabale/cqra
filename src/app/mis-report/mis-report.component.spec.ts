import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisReportComponent } from './mis-report.component';

describe('MisReportComponent', () => {
  let component: MisReportComponent;
  let fixture: ComponentFixture<MisReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
