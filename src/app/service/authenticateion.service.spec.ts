import { TestBed } from '@angular/core/testing';

import { AuthenticateionService } from './authenticateion.service';

describe('AuthenticateionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthenticateionService = TestBed.get(AuthenticateionService);
    expect(service).toBeTruthy();
  });
});
