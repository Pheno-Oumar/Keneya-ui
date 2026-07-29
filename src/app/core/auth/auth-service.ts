import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, tap, map, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RegisterInterface } from '../../shared/models/register';
import { Utilisateur } from '../../shared/models/utilisateur';
import { APIResponse } from '../../shared/models/APIResponse';
import { CitoyenProfil } from '../../shared/models/CitoyenProfil';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  private _user = signal<Utilisateur | null>(null);
  private _initialized = signal(false);

  user = this._user.asReadonly();
  isAuthentificated = computed(() => this._user() != null);
  initialized = this._initialized.asReadonly();

  private apiUrl = environment.apiUrl;

  /**
   * Login - Authentification de l'utilisateur
   */
  login(credentials: { email: string; password: string }): Observable<APIResponse<Utilisateur>> {
    console.log('🔐 AuthService - Tentative de connexion');
    console.log('📧 Email:', credentials.email);
    console.log('🔗 URL:', `${this.apiUrl}/auth/login`);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http
      .post<APIResponse<Utilisateur>>(
        `${this.apiUrl}/auth/login`, 
        credentials, 
        {
          headers: headers,
          withCredentials: true
        }
      )
      .pipe(
        tap((response) => {
          console.log('✅ Réponse login:', response);
          
          // Stocker l'utilisateur dans le signal
          if (response && response.data) {
            this._user.set(response.data);
            console.log('👤 Utilisateur stocké:', response.data);
          } else {
            console.warn('⚠️ Pas de données utilisateur dans la réponse');
          }
        }),
        catchError((error) => {
          console.error('❌ Erreur login:', error);
          return throwError(() => error);
        })
      );
  }

  /**
   * Register - Inscription d'un nouveau citoyen
   */
  register(register: RegisterInterface): Observable<APIResponse<any>> {
    console.log('📝 AuthService - Inscription');
    console.log('📦 Données:', register);
    console.log('🔗 URL:', `${this.apiUrl}/citoyens`);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http
      .post<APIResponse<any>>(`${this.apiUrl}/citoyens`, register, {
        headers: headers,
        withCredentials: true
      })
      .pipe(
        tap((response) => {
          console.log('✅ Inscription réussie:', response);
        }),
        catchError((error) => {
          console.error('❌ Erreur inscription:', error);
          return throwError(() => error);
        })
      );
  }

  /**
   * Logout - Déconnexion de l'utilisateur
   */
  logout(): Observable<APIResponse<object>> {
    console.log('🚪 AuthService - Déconnexion');

    return this.http
      .get<APIResponse<object>>(`${this.apiUrl}/auth/logout`, {
        withCredentials: true
      })
      .pipe(
        tap((response) => {
          console.log('✅ Déconnexion réussie:', response);
          this._user.set(null);
        }),
        catchError((error) => {
          console.error('❌ Erreur déconnexion:', error);
          // Même en cas d'erreur, on nettoie l'état en mémoire
          this._user.set(null);
          return throwError(() => error);
        })
      );
  }

  /**
   * CheckSession - Vérifie si l'utilisateur a une session active
   */
  checkSession(): Observable<APIResponse<Utilisateur> | null> {
    console.log('🔍 AuthService - Vérification session');

    return this.http
      .get<APIResponse<Utilisateur>>(`${this.apiUrl}/auth/me`, {
        withCredentials: true
      })
      .pipe(
        tap((response) => {
          console.log('✅ Session active:', response);
          
          if (response && response.data) {
            this._user.set(response.data);
          } else {
            this._user.set(null);
          }
        }),
        catchError((error) => {
          console.warn('⚠️ Pas de session active:', error.status);
          this._user.set(null);
          return of(null);
        }),
        tap(() => {
          this._initialized.set(true);
          console.log('✅ Initialisation terminée');
        })
      );
  }

  /**
   * ModifierCitoyen - Met à jour les informations d'un citoyen
   */
  modifierCitoyen(id: number, infoCitoyen: CitoyenProfil): Observable<CitoyenProfil> {
    console.log('✏️ AuthService - Modification citoyen:', id);
    console.log('📦 Nouvelles données:', infoCitoyen);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http
      .put<APIResponse<CitoyenProfil>>(
        `${this.apiUrl}/citoyens/${id}`, 
        infoCitoyen, 
        {
          headers: headers,
          withCredentials: true
        }
      )
      .pipe(
        map((response) => {
          console.log('✅ Modification réussie:', response);
          
          if (!response || !response.data) {
            throw new Error('Données de réponse invalides');
          }
          
          // Mettre à jour l'utilisateur si c'est le même
          const currentUser = this._user();
          if (currentUser && currentUser.id === id) {
            this._user.set({
              ...currentUser,
              ...response.data
            });
          }
          
          return response.data;
        }),
        catchError((error) => {
          console.error('❌ Erreur modification:', error);
          return throwError(() => error);
        })
      );
  }

  /**
   * CitoyenById - Récupère un citoyen par son ID
   */
  citoyenById(id: number): Observable<CitoyenProfil> {
    console.log('🔍 AuthService - Recherche citoyen:', id);

    return this.http
      .get<APIResponse<CitoyenProfil>>(`${this.apiUrl}/citoyens/${id}`, {
        withCredentials: true
      })
      .pipe(
        map((response) => {
          console.log('✅ Citoyen trouvé:', response);
          
          if (!response || !response.data) {
            throw new Error('Citoyen non trouvé');
          }
          
          return response.data;
        }),
        catchError((error) => {
          console.error('❌ Erreur recherche citoyen:', error);
          return throwError(() => error);
        })
      );
  }

  /**
   * Retourne le rôle de l'utilisateur en majuscule si possible
   */
  getRole(): string | null {
    const currentUser = this._user();
    return currentUser?.role ? currentUser.role.toString().toUpperCase() : null;
  }

  /**
   * Vérifie si l'utilisateur a un rôle spécifique
   */
  hasRole(role: string): boolean {
    const user = this._user();
    return user ? user.role === role : false;
  }

  /**
   * Vérifie si l'utilisateur est connecté
   */
  isLoggedIn(): boolean {
    return this.isAuthentificated();
  }
}
