import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstNoteComponent } from './first-note.component';

describe('FirstNoteComponent', () => {
  let component: FirstNoteComponent;
  let fixture: ComponentFixture<FirstNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
