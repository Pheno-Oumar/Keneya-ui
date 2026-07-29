import { TestBed } from '@angular/core/testing';

import { CategorieConseilService } from './categorie-conseil-service';

describe('CategorieConseilService', () => {
  let service: CategorieConseilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategorieConseilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

