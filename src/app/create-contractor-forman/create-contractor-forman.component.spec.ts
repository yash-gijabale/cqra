import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContractorFormanComponent } from './create-contractor-forman.component';

describe('CreateContractorFormanComponent', () => {
  let component: CreateContractorFormanComponent;
  let fixture: ComponentFixture<CreateContractorFormanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateContractorFormanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateContractorFormanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
