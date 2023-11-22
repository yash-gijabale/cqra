import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQualityIndexReportComponent } from './create-quality-index-report.component';

describe('CreateQualityIndexReportComponent', () => {
  let component: CreateQualityIndexReportComponent;
  let fixture: ComponentFixture<CreateQualityIndexReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateQualityIndexReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateQualityIndexReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
