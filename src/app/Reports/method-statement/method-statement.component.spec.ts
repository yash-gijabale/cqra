import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MethodStatementComponent } from './method-statement.component';

describe('MethodStatementComponent', () => {
  let component: MethodStatementComponent;
  let fixture: ComponentFixture<MethodStatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MethodStatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MethodStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
