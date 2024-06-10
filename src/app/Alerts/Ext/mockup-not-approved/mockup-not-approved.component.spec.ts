import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockupNotApprovedComponent } from './mockup-not-approved.component';

describe('MockupNotApprovedComponent', () => {
  let component: MockupNotApprovedComponent;
  let fixture: ComponentFixture<MockupNotApprovedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MockupNotApprovedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockupNotApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
