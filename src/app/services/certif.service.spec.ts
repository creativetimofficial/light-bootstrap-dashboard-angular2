import { TestBed } from '@angular/core/testing';

import { CertifService } from './certif.service';

describe('CertifService', () => {
  let service: CertifService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CertifService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
