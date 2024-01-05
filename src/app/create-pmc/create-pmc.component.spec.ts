import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePmcComponent } from './create-pmc.component';

describe('CreatePmcComponent', () => {
  let component: CreatePmcComponent;
  let fixture: ComponentFixture<CreatePmcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePmcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePmcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
