import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserAllocationComponent } from './create-user-allocation.component';

describe('CreateUserAllocationComponent', () => {
  let component: CreateUserAllocationComponent;
  let fixture: ComponentFixture<CreateUserAllocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUserAllocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
