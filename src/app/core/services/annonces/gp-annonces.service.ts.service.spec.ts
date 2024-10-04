import { TestBed } from '@angular/core/testing';

import { GpAnnoncesService } from './gp-annonces.service';

describe('GpAnnoncesServiceTsService', () => {
  let service: GpAnnoncesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GpAnnoncesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
