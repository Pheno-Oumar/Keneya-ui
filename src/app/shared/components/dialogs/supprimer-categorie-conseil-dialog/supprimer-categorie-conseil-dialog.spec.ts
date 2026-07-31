import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupprimerCategorieConseilDialog } from './supprimer-categorie-conseil-dialog';

describe('SupprimerCategorieConseilDialog', () => {
  let component: SupprimerCategorieConseilDialog;
  let fixture: ComponentFixture<SupprimerCategorieConseilDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupprimerCategorieConseilDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(SupprimerCategorieConseilDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

