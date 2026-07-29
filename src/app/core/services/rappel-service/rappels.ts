import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { OngletRappel, RappelPayload, RappelResponse } from '../../../shared/models/rappel';

@Injectable({ providedIn: 'root' })
export class RappelService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/rappels`;
  private options = { withCredentials: true };

  creer(payload: RappelPayload): Observable<RappelResponse> {
    return this.http.post<RappelResponse>(`${this.apiUrl}/create`, payload, this.options);
  }

  createRappel(payload: RappelPayload): Observable<RappelResponse> {
    return this.creer(payload);
  }

  obtenirTous(): Observable<RappelResponse[]> {
    return this.http.get<RappelResponse[]>(`${this.apiUrl}/read`, this.options);
  }

  obtenirParOnglet(onglet: OngletRappel): Observable<RappelResponse[]> {
    switch (onglet) {
      case 'a_venir':
        return this.http.get<RappelResponse[]>(`${this.apiUrl}/rappel-actif`, this.options);
      case 'termines':
        return this.http.get<RappelResponse[]>(`${this.apiUrl}/dus`, this.options);
      case 'aujourdhui':
      default:
        return this.http.get<RappelResponse[]>(`${this.apiUrl}/read`, this.options);
    }
  }

  marquerCommePris(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`, this.options);
  }
}
