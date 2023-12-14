import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserlogReportViewComponent } from './userlog-report-view.component';

describe('UserlogReportViewComponent', () => {
  let component: UserlogReportViewComponent;
  let fixture: ComponentFixture<UserlogReportViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserlogReportViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserlogReportViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
