import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFirstNoteComponent } from './create-first-note.component';

describe('CreateFirstNoteComponent', () => {
  let component: CreateFirstNoteComponent;
  let fixture: ComponentFixture<CreateFirstNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFirstNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFirstNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
