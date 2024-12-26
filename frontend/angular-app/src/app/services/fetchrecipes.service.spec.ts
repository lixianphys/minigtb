import { TestBed } from '@angular/core/testing';

import { FetchrecipesService } from './fetchrecipes.service';

describe('FetchrecipesService', () => {
  let service: FetchrecipesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchrecipesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
