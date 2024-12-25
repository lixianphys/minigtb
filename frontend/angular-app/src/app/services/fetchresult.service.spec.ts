import { TestBed } from '@angular/core/testing';

import { FetchresultService } from './fetchresult.service';

describe('FetchresultService', () => {
  let service: FetchresultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchresultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
