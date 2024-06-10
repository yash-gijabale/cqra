import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityProcedureAmmendmentComponent } from './quality-procedure-ammendment.component';

describe('QualityProcedureAmmendmentComponent', () => {
  let component: QualityProcedureAmmendmentComponent;
  let fixture: ComponentFixture<QualityProcedureAmmendmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualityProcedureAmmendmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityProcedureAmmendmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
