import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTradeGroupComponent } from './create-trade-group.component';

describe('CreateTradeGroupComponent', () => {
  let component: CreateTradeGroupComponent;
  let fixture: ComponentFixture<CreateTradeGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTradeGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTradeGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
