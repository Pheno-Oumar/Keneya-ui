import { TestBed } from '@angular/core/testing';

import { CitoyenActiviteService } from './citoyen-activite-service';

describe('CitoyenActiviteService', () => {
  let service: CitoyenActiviteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CitoyenActiviteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
