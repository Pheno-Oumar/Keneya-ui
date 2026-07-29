import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieConseilComponent } from './categorie-conseil-component';

describe('CategorieConseilComponent', () => {
  let component: CategorieConseilComponent;
  let fixture: ComponentFixture<CategorieConseilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorieConseilComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CategorieConseilComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

