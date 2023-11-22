import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceReportComponent } from './reference-report.component';

describe('ReferenceReportComponent', () => {
  let component: ReferenceReportComponent;
  let fixture: ComponentFixture<ReferenceReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferenceReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
