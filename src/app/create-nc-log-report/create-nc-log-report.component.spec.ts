import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNcLogReportComponent } from './create-nc-log-report.component';

describe('CreateNcLogReportComponent', () => {
  let component: CreateNcLogReportComponent;
  let fixture: ComponentFixture<CreateNcLogReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNcLogReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNcLogReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
