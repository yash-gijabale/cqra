import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisAppriciationComponent } from './mis-appriciation.component';

describe('MisAppriciationComponent', () => {
  let component: MisAppriciationComponent;
  let fixture: ComponentFixture<MisAppriciationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisAppriciationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisAppriciationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
