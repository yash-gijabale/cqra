import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignEquipementListComponent } from './assign-equipement-list.component';

describe('AssignEquipementListComponent', () => {
  let component: AssignEquipementListComponent;
  let fixture: ComponentFixture<AssignEquipementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignEquipementListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignEquipementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
