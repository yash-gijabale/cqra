import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NcCountReportComponent } from './nc-count-report.component';

describe('NcCountReportComponent', () => {
  let component: NcCountReportComponent;
  let fixture: ComponentFixture<NcCountReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NcCountReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NcCountReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
