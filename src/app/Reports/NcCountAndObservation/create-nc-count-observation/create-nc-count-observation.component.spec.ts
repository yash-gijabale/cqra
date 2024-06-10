import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNcCountObservationComponent } from './create-nc-count-observation.component';

describe('CreateNcCountObservationComponent', () => {
  let component: CreateNcCountObservationComponent;
  let fixture: ComponentFixture<CreateNcCountObservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNcCountObservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNcCountObservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
