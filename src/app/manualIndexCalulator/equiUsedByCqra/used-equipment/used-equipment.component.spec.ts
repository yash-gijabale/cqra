import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsedEquipmentComponent } from './used-equipment.component';

describe('UsedEquipmentComponent', () => {
  let component: UsedEquipmentComponent;
  let fixture: ComponentFixture<UsedEquipmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsedEquipmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsedEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
