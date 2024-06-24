import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadReportsComponent } from './download-reports.component';

describe('DownloadReportsComponent', () => {
  let component: DownloadReportsComponent;
  let fixture: ComponentFixture<DownloadReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
