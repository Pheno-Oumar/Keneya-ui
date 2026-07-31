import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router'; // Pour simuler le routeur
import { of } from 'rxjs'; // Pour simuler une réponse d'API
import { Citoyen } from './citoyen';
import { RappelService } from '../../../core/services/rappels';

describe('Citoyen', () => {
  let component: Citoyen;
  let fixture: ComponentFixture<Citoyen>;

  // Création d'un faux RappelService pour éviter les erreurs d'injection HttpClient
  const rappelServiceMock = {
    obtenirTous: () => of([]) // Renvoie un tableau vide fictif
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Citoyen],
      providers: [
        provideRouter([]), // 1. Règle le problème du RouterLink
        { provide: RappelService, useValue: rappelServiceMock } // 2. Règle le problème du HttpClient
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Citoyen);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Déclenche le ngOnInit en toute sécurité
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});