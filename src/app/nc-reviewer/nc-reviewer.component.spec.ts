import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NcReviewerComponent } from './nc-reviewer.component';

describe('NcReviewerComponent', () => {
  let component: NcReviewerComponent;
  let fixture: ComponentFixture<NcReviewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NcReviewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NcReviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
