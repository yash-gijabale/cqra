import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateSamplingReortComponent } from './generate-sampling-reort.component';

describe('GenerateSamplingReortComponent', () => {
  let component: GenerateSamplingReortComponent;
  let fixture: ComponentFixture<GenerateSamplingReortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateSamplingReortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateSamplingReortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
