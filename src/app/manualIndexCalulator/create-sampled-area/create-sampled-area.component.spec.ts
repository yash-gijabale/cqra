import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSampledAreaComponent } from './create-sampled-area.component';

describe('CreateSampledAreaComponent', () => {
  let component: CreateSampledAreaComponent;
  let fixture: ComponentFixture<CreateSampledAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSampledAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSampledAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
