import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientStaffComponent } from './client-staff.component';

describe('ClientStaffComponent', () => {
  let component: ClientStaffComponent;
  let fixture: ComponentFixture<ClientStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientStaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
