import { TestBed } from '@angular/core/testing';

import { InspectorTraning } from './inspectionTraining.service';}

describe('InspectorTraning', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InspectorTraning = TestBed.get(InspectorTraning);
    expect(service).toBeTruthy();
  });
});
