import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SamplingComponent } from './sampling.component';

describe('SamplingComponent', () => {
  let component: SamplingComponent;
  let fixture: ComponentFixture<SamplingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SamplingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamplingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
