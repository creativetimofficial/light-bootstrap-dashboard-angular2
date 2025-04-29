import { TestBed } from '@angular/core/testing';

import { EmployeurService } from './employeur.service';

describe('EmployeurService', () => {
  let service: EmployeurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
