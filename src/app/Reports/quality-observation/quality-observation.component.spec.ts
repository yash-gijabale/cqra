import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityObservationComponent } from './quality-observation.component';

describe('QualityObservationComponent', () => {
  let component: QualityObservationComponent;
  let fixture: ComponentFixture<QualityObservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualityObservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityObservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
