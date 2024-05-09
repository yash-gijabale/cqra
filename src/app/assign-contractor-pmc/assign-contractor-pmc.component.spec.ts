import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignContractorPmcComponent } from './assign-contractor-pmc.component';

describe('AssignContractorPmcComponent', () => {
  let component: AssignContractorPmcComponent;
  let fixture: ComponentFixture<AssignContractorPmcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignContractorPmcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignContractorPmcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
