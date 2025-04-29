import { TestBed } from '@angular/core/testing';

import { ParticipantListService } from './participant-list.service';

describe('ParticipantListService', () => {
  let service: ParticipantListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParticipantListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
