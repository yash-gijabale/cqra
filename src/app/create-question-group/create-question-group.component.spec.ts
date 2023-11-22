import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQuestionGroupComponent } from './create-question-group.component';

describe('CreateQuestionGroupComponent', () => {
  let component: CreateQuestionGroupComponent;
  let fixture: ComponentFixture<CreateQuestionGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateQuestionGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateQuestionGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
