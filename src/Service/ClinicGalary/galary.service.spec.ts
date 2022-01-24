import { TestBed } from '@angular/core/testing';

import { GalaryService } from './galary.service';

describe('GalaryService', () => {
  let service: GalaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GalaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
