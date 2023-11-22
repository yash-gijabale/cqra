import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorFormanComponent } from './contractor-forman.component';

describe('ContractorFormanComponent', () => {
  let component: ContractorFormanComponent;
  let fixture: ComponentFixture<ContractorFormanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorFormanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorFormanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
