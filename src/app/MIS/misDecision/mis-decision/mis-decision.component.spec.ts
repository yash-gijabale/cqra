import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisDecisionComponent } from './mis-decision.component';

describe('MisDecisionComponent', () => {
  let component: MisDecisionComponent;
  let fixture: ComponentFixture<MisDecisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisDecisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisDecisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
