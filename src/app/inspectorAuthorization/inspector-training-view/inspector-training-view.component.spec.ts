import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectorTrainingViewComponent } from './inspector-training-view.component';

describe('InspectorTrainingViewComponent', () => {
  let component: InspectorTrainingViewComponent;
  let fixture: ComponentFixture<InspectorTrainingViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectorTrainingViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectorTrainingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
