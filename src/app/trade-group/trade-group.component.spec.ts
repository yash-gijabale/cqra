import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeGroupComponent } from './trade-group.component';

describe('TradeGroupComponent', () => {
  let component: TradeGroupComponent;
  let fixture: ComponentFixture<TradeGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
