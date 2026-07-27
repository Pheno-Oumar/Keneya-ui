import { TestBed } from '@angular/core/testing';

import { CitoyenActivitePlanService } from './citoyen-activite-plan.service';

describe('CitoyenActivitePlanService', () => {
  let service: CitoyenActivitePlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CitoyenActivitePlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
