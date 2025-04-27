import { TestBed } from '@angular/core/testing';

import { FormationListService } from './formation-list.service';

describe('FormationListService', () => {
  let service: FormationListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormationListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
