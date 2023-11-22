import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEquipUsedByContractorComponent } from './create-equip-used-by-contractor.component';

describe('CreateEquipUsedByContractorComponent', () => {
  let component: CreateEquipUsedByContractorComponent;
  let fixture: ComponentFixture<CreateEquipUsedByContractorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEquipUsedByContractorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEquipUsedByContractorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
