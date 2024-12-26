import { TestBed } from '@angular/core/testing';

import { FetchpatientsService } from './fetchpatients.service';

describe('FetchpatientsService', () => {
  let service: FetchpatientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchpatientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
