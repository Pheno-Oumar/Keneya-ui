import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CitoyenProfil } from '../shared/models/CitoyenProfil';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Profil {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  modifierCitoyen(id: number, infoCitoyen: CitoyenProfil) {
    return this.http.put(`${this.apiUrl}/citoyens/${id}`, infoCitoyen, {
      withCredentials: true,
    });
  }

  citoyenById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/citoyens/${id}`, {
      withCredentials: true,
    });
  }
}

