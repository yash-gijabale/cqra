import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignContractorForemanComponent } from './assign-contractor-foreman.component';

describe('AssignContractorForemanComponent', () => {
  let component: AssignContractorForemanComponent;
  let fixture: ComponentFixture<AssignContractorForemanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignContractorForemanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignContractorForemanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
