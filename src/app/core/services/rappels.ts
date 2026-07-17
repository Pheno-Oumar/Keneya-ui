import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  RappelMedical,
  RappelPayload,
  StatutRappel,
  OngletRappel,
} from '../../shared/models/rappel';

@Injectable({ providedIn: 'root' })
export class RappelService {
  private readonly baseUrl = '/api/rappels';

  constructor(private http: HttpClient) {}

  obtenirParOnglet(onglet: OngletRappel): Observable<RappelMedical[]> {
    const params = new HttpParams().set('onglet', onglet);
    return this.http.get<RappelMedical[]>(this.baseUrl, { params });
  }

  obtenirTous(): Observable<RappelMedical[]> {
    return this.http.get<RappelMedical[]>(this.baseUrl);
  }

  obtenirParId(id: string): Observable<RappelMedical> {
    return this.http.get<RappelMedical>(`${this.baseUrl}/${id}`);
  }

  creer(payload: RappelPayload): Observable<RappelMedical> {
    return this.http.post<RappelMedical>(this.baseUrl, payload);
  }

  modifier(id: string, payload: Partial<RappelPayload>): Observable<RappelMedical> {
    return this.http.put<RappelMedical>(`${this.baseUrl}/${id}`, payload);
  }

  supprimer(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  marquerCommePris(id: string): Observable<RappelMedical> {
    return this.http.patch<RappelMedical>(`${this.baseUrl}/${id}/statut`, {
      statut: 'pris' as StatutRappel,
    });
  }
}