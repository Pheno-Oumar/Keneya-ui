import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { RegisterInterface } from '../../shared/models/register';
import { Utilisateur } from '../../shared/models/utilisateur';
import { APIResponse } from '../../shared/models/APIResponse';
import { Citoyen } from '../../features/dashboard/citoyen/citoyen';
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

  private apiUrl = 'http://localhost:8090';

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http
      .post<APIResponse<Utilisateur>>(`${this.apiUrl}/auth/login`, credentials, {
        withCredentials: true,
      })
      .pipe(tap((res) => this._user.set(res.data)));
  }

  register(register: RegisterInterface) {
    console.log(`Dans le service le contenu de register ${register}`);
    return this.http.post(`${this.apiUrl}/citoyens`, register, { withCredentials: true });
  }

  logout() {
    return this.http
      .get<APIResponse<object>>(`${this.apiUrl}/auth/logout`, {
        withCredentials: true,
      })
      .pipe(tap((res) => this._user.set(null)));
  }

  cheickSession() {
    return this.http
      .get<APIResponse<Utilisateur>>(`${this.apiUrl}/auth/me`, { withCredentials: true })
      .pipe(
        tap((res) => this._user.set(res.data)),
        catchError(() => {
          this._user.set(null);
          return of(null);
        }),
        tap(() => this._initialized.set(true)),
      );
  }

//  modifierCitoyen(id:number,infoCitoyen:CitoyenProfil):Observable<any>{
//  return this.http
//        .put(`${this.apiUrl}/citoyens/${id}`,infoCitoyen, {
//          withCredentials: true,
//        })

// }
//   citoyenById(id:number): Observable<any>{
//         return this.http
//       .get(`${this.apiUrl}/citoyens/${id}`,  {
//         withCredentials: true,
//       })

//   } 

}
