import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSupervisorEngineerChangedComponent } from './client-supervisor-engineer-changed.component';

describe('ClientSupervisorEngineerChangedComponent', () => {
  let component: ClientSupervisorEngineerChangedComponent;
  let fixture: ComponentFixture<ClientSupervisorEngineerChangedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientSupervisorEngineerChangedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSupervisorEngineerChangedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
