import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAllocationComponent } from './user-allocation.component';

describe('UserAllocationComponent', () => {
  let component: UserAllocationComponent;
  let fixture: ComponentFixture<UserAllocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAllocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
