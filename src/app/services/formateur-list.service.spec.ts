import { TestBed } from '@angular/core/testing';

import { FormateurListService } from './formateur-list.service';

describe('FormateurListService', () => {
  let service: FormateurListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormateurListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
