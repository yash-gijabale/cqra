import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSamplingStepThreeComponent } from './create-sampling-step-three.component';

describe('CreateSamplingStepThreeComponent', () => {
  let component: CreateSamplingStepThreeComponent;
  let fixture: ComponentFixture<CreateSamplingStepThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSamplingStepThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSamplingStepThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
