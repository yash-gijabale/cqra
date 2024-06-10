import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityProgressReportComponent } from './activity-progress-report.component';

describe('ActivityProgressReportComponent', () => {
  let component: ActivityProgressReportComponent;
  let fixture: ComponentFixture<ActivityProgressReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityProgressReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityProgressReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
