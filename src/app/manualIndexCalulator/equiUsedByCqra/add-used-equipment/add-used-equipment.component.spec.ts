import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUsedEquipmentComponent } from './add-used-equipment.component';

describe('AddUsedEquipmentComponent', () => {
  let component: AddUsedEquipmentComponent;
  let fixture: ComponentFixture<AddUsedEquipmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUsedEquipmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUsedEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
