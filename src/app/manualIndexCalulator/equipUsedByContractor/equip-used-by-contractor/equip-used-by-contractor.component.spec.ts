import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipUsedByContractorComponent } from './equip-used-by-contractor.component';

describe('EquipUsedByContractorComponent', () => {
  let component: EquipUsedByContractorComponent;
  let fixture: ComponentFixture<EquipUsedByContractorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipUsedByContractorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipUsedByContractorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
