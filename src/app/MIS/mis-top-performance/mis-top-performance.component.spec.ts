import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisTopPerformanceComponent } from './mis-top-performance.component';

describe('MisTopPerformanceComponent', () => {
  let component: MisTopPerformanceComponent;
  let fixture: ComponentFixture<MisTopPerformanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisTopPerformanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisTopPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
