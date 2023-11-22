import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatEquipUsedByClientComponent } from './creat-equip-used-by-client.component';

describe('CreatEquipUsedByClientComponent', () => {
  let component: CreatEquipUsedByClientComponent;
  let fixture: ComponentFixture<CreatEquipUsedByClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatEquipUsedByClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatEquipUsedByClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
