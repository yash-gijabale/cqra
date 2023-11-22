import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionHeadingComponent } from './question-heading.component';

describe('QuestionHeadingComponent', () => {
  let component: QuestionHeadingComponent;
  let fixture: ComponentFixture<QuestionHeadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionHeadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
