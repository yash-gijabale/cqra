import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorSupervisorComponent } from './contractor-supervisor.component';

describe('ContractorSupervisorComponent', () => {
  let component: ContractorSupervisorComponent;
  let fixture: ComponentFixture<ContractorSupervisorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorSupervisorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
