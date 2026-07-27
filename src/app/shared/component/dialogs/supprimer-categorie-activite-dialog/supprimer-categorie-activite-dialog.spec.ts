import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupprimerCategorieActiviteDialog } from './supprimer-categorie-activite-dialog';

describe('SupprimerCategorieActiviteDialog', () => {
  let component: SupprimerCategorieActiviteDialog;
  let fixture: ComponentFixture<SupprimerCategorieActiviteDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupprimerCategorieActiviteDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(SupprimerCategorieActiviteDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
