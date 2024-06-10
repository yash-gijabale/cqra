import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMinutesOfMeetingReportComponent } from './create-minutes-of-meeting-report.component';

describe('CreateMinutesOfMeetingReportComponent', () => {
  let component: CreateMinutesOfMeetingReportComponent;
  let fixture: ComponentFixture<CreateMinutesOfMeetingReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMinutesOfMeetingReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMinutesOfMeetingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
