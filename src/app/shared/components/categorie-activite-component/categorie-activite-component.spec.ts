import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieActiviteComponent } from './categorie-activite-component';

describe('CategorieActiviteComponent', () => {
  let component: CategorieActiviteComponent;
  let fixture: ComponentFixture<CategorieActiviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorieActiviteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CategorieActiviteComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

