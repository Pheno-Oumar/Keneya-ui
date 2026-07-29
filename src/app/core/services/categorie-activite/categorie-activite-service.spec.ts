import { TestBed } from '@angular/core/testing';

import { CategorieActiviteService } from './categorie-activite-service';

describe('CategorieActiviteService', () => {
  let service: CategorieActiviteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategorieActiviteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

