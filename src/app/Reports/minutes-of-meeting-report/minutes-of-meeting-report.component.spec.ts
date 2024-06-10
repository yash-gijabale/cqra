import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinutesOfMeetingReportComponent } from './minutes-of-meeting-report.component';

describe('MinutesOfMeetingReportComponent', () => {
  let component: MinutesOfMeetingReportComponent;
  let fixture: ComponentFixture<MinutesOfMeetingReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinutesOfMeetingReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinutesOfMeetingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
