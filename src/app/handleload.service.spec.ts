import { TestBed, inject } from '@angular/core/testing';

import { HandleloadService } from './handleload.service';

describe('HandleloadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HandleloadService]
    });
  });

  it('should be created', inject([HandleloadService], (service: HandleloadService) => {
    expect(service).toBeTruthy();
  }));
});
