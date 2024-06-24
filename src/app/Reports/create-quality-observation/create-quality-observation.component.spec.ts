import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQualityObservationComponent } from './create-quality-observation.component';

describe('CreateQualityObservationComponent', () => {
  let component: CreateQualityObservationComponent;
  let fixture: ComponentFixture<CreateQualityObservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateQualityObservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateQualityObservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
