import { TestBed } from '@angular/core/testing';

import { EmployeurListService } from './employeur-list.service';

describe('EmployeurListService', () => {
  let service: EmployeurListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeurListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
