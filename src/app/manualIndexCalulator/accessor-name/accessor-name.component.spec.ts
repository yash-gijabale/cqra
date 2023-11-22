import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessorNameComponent } from './accessor-name.component';

describe('AccessorNameComponent', () => {
  let component: AccessorNameComponent;
  let fixture: ComponentFixture<AccessorNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessorNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessorNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
