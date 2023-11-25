import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NcCloserViewReportComponent } from './nc-closer-view-report.component';

describe('NcCloserViewReportComponent', () => {
  let component: NcCloserViewReportComponent;
  let fixture: ComponentFixture<NcCloserViewReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NcCloserViewReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NcCloserViewReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
