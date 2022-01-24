import { TestBed } from '@angular/core/testing';

import { ClinicMangeService } from './clinic-mange.service';

describe('ClinicMangeService', () => {
  let service: ClinicMangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClinicMangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
