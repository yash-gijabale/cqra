import { TestBed } from '@angular/core/testing';

import { ClientServiceService } from './client-service.service';

describe('ClientServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClientServiceService = TestBed.get(ClientServiceService);
    expect(service).toBeTruthy();
  });
});
