import { TestBed } from '@angular/core/testing';

import { ClinicScheduleService } from './clinic-schedule.service';

describe('ClinicScheduleService', () => {
  let service: ClinicScheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClinicScheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
