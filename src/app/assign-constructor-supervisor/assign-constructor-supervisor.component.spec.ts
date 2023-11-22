import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignConstructorSupervisorComponent } from './assign-constructor-supervisor.component';

describe('AssignConstructorSupervisorComponent', () => {
  let component: AssignConstructorSupervisorComponent;
  let fixture: ComponentFixture<AssignConstructorSupervisorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignConstructorSupervisorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignConstructorSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
