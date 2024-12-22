import { TestBed } from '@angular/core/testing';

import { FavoritesCitiesService } from './favorite-cities.service';

describe('FavoritesCitiesService', () => {
  let service: FavoritesCitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritesCitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
