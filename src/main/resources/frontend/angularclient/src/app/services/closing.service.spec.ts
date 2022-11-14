import { TestBed } from '@angular/core/testing';

import { ClosingService } from './closing.service';

describe('ClosingService', () => {
  let service: ClosingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClosingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
