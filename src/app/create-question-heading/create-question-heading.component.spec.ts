import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQuestionHeadingComponent } from './create-question-heading.component';

describe('CreateQuestionHeadingComponent', () => {
  let component: CreateQuestionHeadingComponent;
  let fixture: ComponentFixture<CreateQuestionHeadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateQuestionHeadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateQuestionHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
