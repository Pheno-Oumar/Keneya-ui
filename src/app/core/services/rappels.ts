import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  RappelMedical,
  RappelPayload,
  StatutRappel,
  OngletRappel,
  Rappel,
  RappelResponse,
} from '../../shared/models/rappel';

@Injectable({ providedIn: 'root' })
export class RappelService {
  private readonly baseUrl = '/api/rappels';
   private http = inject(HttpClient);

  obtenirParOnglet(onglet: OngletRappel): Observable<RappelMedical[]> {
    const params = new HttpParams().set('onglet', onglet);
    return this.http.get<RappelMedical[]>(this.baseUrl, { params , withCredentials: true});
  }

  obtenirTous(): Observable<RappelResponse[]> {
    return this.http.get<RappelResponse[]>(`${this.baseUrl}/rappel-actif`,{withCredentials: true});
  }

  obtenirParId(id: string): Observable<RappelResponse> {
    return this.http.get<RappelResponse>(`${this.baseUrl}/${id}`, {withCredentials: true});
  }

  creer(payload: Rappel): Observable<RappelResponse> {
    return this.http.post<RappelResponse>(`${this.baseUrl}/create`,payload, {withCredentials: true});
  }

   rappelsDus(): Observable<RappelResponse[]> {
    return this.http.get<RappelResponse[]>(`${this.baseUrl}/dus`, {withCredentials: true});
  }

  // modifier(id: string, payload: Partial<RappelPayload>): Observable<RappelMedical> {
  //   return this.http.put<RappelMedical>(`${this.baseUrl}/${id}`, payload);
  // }

  supprimer(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, {withCredentials: true});
  }

  marquerCommePris(id: string): Observable<RappelMedical> {
    return this.http.patch<RappelMedical>(`${this.baseUrl}/${id}/statut`, {
      statut: 'pris' as StatutRappel,
    }, {withCredentials: true});
  }
}