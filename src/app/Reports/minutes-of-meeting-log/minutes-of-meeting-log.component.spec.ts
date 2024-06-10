import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinutesOfMeetingLogComponent } from './minutes-of-meeting-log.component';

describe('MinutesOfMeetingLogComponent', () => {
  let component: MinutesOfMeetingLogComponent;
  let fixture: ComponentFixture<MinutesOfMeetingLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinutesOfMeetingLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinutesOfMeetingLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
