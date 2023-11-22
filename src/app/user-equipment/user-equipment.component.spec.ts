import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEquipmentComponent } from './user-equipment.component';

describe('UserEquipmentComponent', () => {
  let component: UserEquipmentComponent;
  let fixture: ComponentFixture<UserEquipmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserEquipmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
