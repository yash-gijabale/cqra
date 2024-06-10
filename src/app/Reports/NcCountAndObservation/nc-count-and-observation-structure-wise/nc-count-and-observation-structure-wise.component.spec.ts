import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NcCountAndObservationStructureWiseComponent } from './nc-count-and-observation-structure-wise.component';

describe('NcCountAndObservationStructureWiseComponent', () => {
  let component: NcCountAndObservationStructureWiseComponent;
  let fixture: ComponentFixture<NcCountAndObservationStructureWiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NcCountAndObservationStructureWiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NcCountAndObservationStructureWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
