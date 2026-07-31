import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieConseilDialog } from './categorie-conseil-dialog';

describe('CategorieConseilDialog', () => {
  let component: CategorieConseilDialog;
  let fixture: ComponentFixture<CategorieConseilDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorieConseilDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(CategorieConseilDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

