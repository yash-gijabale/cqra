import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccessorNameComponent } from './create-accessor-name.component';

describe('CreateAccessorNameComponent', () => {
  let component: CreateAccessorNameComponent;
  let fixture: ComponentFixture<CreateAccessorNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAccessorNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccessorNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
