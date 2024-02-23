import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectorTradeTrainingComponent } from './inspector-trade-training.component';

describe('InspectorTradeTrainingComponent', () => {
  let component: InspectorTradeTrainingComponent;
  let fixture: ComponentFixture<InspectorTradeTrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectorTradeTrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectorTradeTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
