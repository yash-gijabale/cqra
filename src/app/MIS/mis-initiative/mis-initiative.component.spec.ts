import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisInitiativeComponent } from './mis-initiative.component';

describe('MisInitiativeComponent', () => {
  let component: MisInitiativeComponent;
  let fixture: ComponentFixture<MisInitiativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisInitiativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisInitiativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
