import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NcNotClosedComponent } from './nc-not-closed.component';

describe('NcNotClosedComponent', () => {
  let component: NcNotClosedComponent;
  let fixture: ComponentFixture<NcNotClosedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NcNotClosedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NcNotClosedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
