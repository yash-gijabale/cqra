import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestNewSamplingComponent } from './test-new-sampling.component';

describe('TestNewSamplingComponent', () => {
  let component: TestNewSamplingComponent;
  let fixture: ComponentFixture<TestNewSamplingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestNewSamplingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestNewSamplingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
