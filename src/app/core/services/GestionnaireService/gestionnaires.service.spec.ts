import { TestBed } from '@angular/core/testing';

import { GestionnairesService } from './gestionnaires.service';

describe('GestionnairesService', () => {
  let service: GestionnairesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionnairesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
