import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSchemeMomReportComponent } from './create-scheme-mom-report.component';

describe('CreateSchemeMomReportComponent', () => {
  let component: CreateSchemeMomReportComponent;
  let fixture: ComponentFixture<CreateSchemeMomReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSchemeMomReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSchemeMomReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
