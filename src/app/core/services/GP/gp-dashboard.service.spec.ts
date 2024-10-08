import { TestBed } from '@angular/core/testing';

import { GpDashboardService } from './gp-dashboard.service';

describe('GpDashboardService', () => {
  let service: GpDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GpDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
