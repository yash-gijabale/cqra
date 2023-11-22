import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContractorComponent } from './create-contractor.component';

describe('CreateContractorComponent', () => {
  let component: CreateContractorComponent;
  let fixture: ComponentFixture<CreateContractorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateContractorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateContractorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
