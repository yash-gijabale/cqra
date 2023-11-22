import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTardeComponent } from './create-tarde.component';

describe('CreateTardeComponent', () => {
  let component: CreateTardeComponent;
  let fixture: ComponentFixture<CreateTardeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTardeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTardeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
