import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaateInspectionreportComponent } from './creaate-inspectionreport.component';

describe('CreaateInspectionreportComponent', () => {
  let component: CreaateInspectionreportComponent;
  let fixture: ComponentFixture<CreaateInspectionreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreaateInspectionreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreaateInspectionreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
