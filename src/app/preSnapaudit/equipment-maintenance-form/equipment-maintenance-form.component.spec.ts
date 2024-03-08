import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentMaintenanceFormComponent } from './equipment-maintenance-form.component';

describe('EquipmentMaintenanceFormComponent', () => {
  let component: EquipmentMaintenanceFormComponent;
  let fixture: ComponentFixture<EquipmentMaintenanceFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentMaintenanceFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentMaintenanceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
