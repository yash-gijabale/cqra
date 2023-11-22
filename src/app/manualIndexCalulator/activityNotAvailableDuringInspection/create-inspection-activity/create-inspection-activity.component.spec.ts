import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInspectionActivityComponent } from './create-inspection-activity.component';

describe('CreateInspectionActivityComponent', () => {
  let component: CreateInspectionActivityComponent;
  let fixture: ComponentFixture<CreateInspectionActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateInspectionActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInspectionActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
