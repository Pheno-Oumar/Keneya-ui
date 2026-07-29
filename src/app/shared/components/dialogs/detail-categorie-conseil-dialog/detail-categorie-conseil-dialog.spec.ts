import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCategorieConseilDialog } from './detail-categorie-conseil-dialog';

describe('DetailCategorieConseilDialog', () => {
  let component: DetailCategorieConseilDialog;
  let fixture: ComponentFixture<DetailCategorieConseilDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailCategorieConseilDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailCategorieConseilDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

