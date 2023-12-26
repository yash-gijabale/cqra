import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NcCountReportListComponent } from './nc-count-report-list.component';

describe('NcCountReportListComponent', () => {
  let component: NcCountReportListComponent;
  let fixture: ComponentFixture<NcCountReportListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NcCountReportListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NcCountReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
