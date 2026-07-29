import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieActiviteDialog } from './categorie-activite-dialog';

describe('CategorieActiviteDialog', () => {
  let component: CategorieActiviteDialog;
  let fixture: ComponentFixture<CategorieActiviteDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorieActiviteDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(CategorieActiviteDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

