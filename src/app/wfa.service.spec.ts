import { TestBed } from '@angular/core/testing';

import { WfaService } from './wfa.service';

describe('WfaService', () => {
  let service: WfaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WfaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
