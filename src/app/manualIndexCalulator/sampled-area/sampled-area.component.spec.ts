import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampledAreaComponent } from './sampled-area.component';

describe('SampledAreaComponent', () => {
  let component: SampledAreaComponent;
  let fixture: ComponentFixture<SampledAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampledAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampledAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
