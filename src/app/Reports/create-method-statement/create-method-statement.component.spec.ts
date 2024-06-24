import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMethodStatementComponent } from './create-method-statement.component';

describe('CreateMethodStatementComponent', () => {
  let component: CreateMethodStatementComponent;
  let fixture: ComponentFixture<CreateMethodStatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMethodStatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMethodStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
