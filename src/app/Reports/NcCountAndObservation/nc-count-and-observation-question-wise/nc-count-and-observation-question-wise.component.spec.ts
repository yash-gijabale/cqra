import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NcCountAndObservationQuestionWiseComponent } from './nc-count-and-observation-question-wise.component';

describe('NcCountAndObservationQuestionWiseComponent', () => {
  let component: NcCountAndObservationQuestionWiseComponent;
  let fixture: ComponentFixture<NcCountAndObservationQuestionWiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NcCountAndObservationQuestionWiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NcCountAndObservationQuestionWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
