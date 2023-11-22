import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReferenceReportComponent } from './create-reference-report.component';

describe('CreateReferenceReportComponent', () => {
  let component: CreateReferenceReportComponent;
  let fixture: ComponentFixture<CreateReferenceReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateReferenceReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateReferenceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
