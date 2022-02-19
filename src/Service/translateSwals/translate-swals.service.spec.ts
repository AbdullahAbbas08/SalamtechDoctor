import { TestBed } from '@angular/core/testing';

import { TranslateSwalsService } from './translate-swals.service';

describe('TranslateSwalsService', () => {
  let service: TranslateSwalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslateSwalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
