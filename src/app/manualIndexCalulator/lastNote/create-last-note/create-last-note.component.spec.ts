import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLastNoteComponent } from './create-last-note.component';

describe('CreateLastNoteComponent', () => {
  let component: CreateLastNoteComponent;
  let fixture: ComponentFixture<CreateLastNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLastNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLastNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
