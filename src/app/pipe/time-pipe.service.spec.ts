import { TestBed, inject } from '@angular/core/testing';

import { TimePipeService } from './time-pipe.service';

describe('TimePipeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimePipeService]
    });
  });

  it('should be created', inject([TimePipeService], (service: TimePipeService) => {
    expect(service).toBeTruthy();
  }));
});
