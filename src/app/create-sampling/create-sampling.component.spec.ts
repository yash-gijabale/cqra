import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSamplingComponent } from './create-sampling.component';

describe('CreateSamplingComponent', () => {
  let component: CreateSamplingComponent;
  let fixture: ComponentFixture<CreateSamplingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSamplingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSamplingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
