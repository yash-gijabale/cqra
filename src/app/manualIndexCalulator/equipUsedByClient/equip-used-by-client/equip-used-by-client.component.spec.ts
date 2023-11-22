import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipUsedByClientComponent } from './equip-used-by-client.component';

describe('EquipUsedByClientComponent', () => {
  let component: EquipUsedByClientComponent;
  let fixture: ComponentFixture<EquipUsedByClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipUsedByClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipUsedByClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
