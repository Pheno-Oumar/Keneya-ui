import { TestBed } from '@angular/core/testing';

import { Rappels } from './rappels';

describe('Rappels', () => {
  let service: Rappels;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Rappels);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

