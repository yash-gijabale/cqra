import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserEquipmentComponent } from './create-user-equipment.component';

describe('CreateUserEquipmentComponent', () => {
  let component: CreateUserEquipmentComponent;
  let fixture: ComponentFixture<CreateUserEquipmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUserEquipmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
