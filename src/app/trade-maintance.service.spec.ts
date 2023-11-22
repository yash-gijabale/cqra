import { TestBed } from '@angular/core/testing';

import { TradeMaintanceService } from './trade-maintance.service';

describe('TradeMaintanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TradeMaintanceService = TestBed.get(TradeMaintanceService);
    expect(service).toBeTruthy();
  });
});
