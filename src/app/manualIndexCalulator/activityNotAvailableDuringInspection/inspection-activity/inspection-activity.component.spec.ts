import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionActivityComponent } from './inspection-activity.component';

describe('InspectionActivityComponent', () => {
  let component: InspectionActivityComponent;
  let fixture: ComponentFixture<InspectionActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
