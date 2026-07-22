import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCategorieActiviteDialog } from './detail-categorie-activite-dialog';

describe('DetailCategorieActiviteDialog', () => {
  let component: DetailCategorieActiviteDialog;
  let fixture: ComponentFixture<DetailCategorieActiviteDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailCategorieActiviteDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailCategorieActiviteDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
