import { TestBed } from '@angular/core/testing';

import { ApiService } from './apiservices.service';

describe('ApiservicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiService = TestBed.get(ApiService);
    expect(service).toBeTruthy();
  });
});
