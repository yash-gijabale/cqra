import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMisReportComponent } from './create-mis-report.component';

describe('CreateMisReportComponent', () => {
  let component: CreateMisReportComponent;
  let fixture: ComponentFixture<CreateMisReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMisReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMisReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
