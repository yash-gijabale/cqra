import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastNoteComponent } from './last-note.component';

describe('LastNoteComponent', () => {
  let component: LastNoteComponent;
  let fixture: ComponentFixture<LastNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
