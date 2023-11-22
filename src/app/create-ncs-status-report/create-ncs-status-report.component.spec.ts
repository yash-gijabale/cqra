import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNcsStatusReportComponent } from './create-ncs-status-report.component';

describe('CreateNcsStatusReportComponent', () => {
  let component: CreateNcsStatusReportComponent;
  let fixture: ComponentFixture<CreateNcsStatusReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNcsStatusReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNcsStatusReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
