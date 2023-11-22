import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateClientStaffComponent } from './create-client-staff.component';

describe('CreateClientStaffComponent', () => {
  let component: CreateClientStaffComponent;
  let fixture: ComponentFixture<CreateClientStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateClientStaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateClientStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
