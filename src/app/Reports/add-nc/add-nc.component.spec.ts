import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNcComponent } from './add-nc.component';

describe('AddNcComponent', () => {
  let component: AddNcComponent;
  let fixture: ComponentFixture<AddNcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
