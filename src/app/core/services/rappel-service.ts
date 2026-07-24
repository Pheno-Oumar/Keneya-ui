import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Rappel, RappelResponse } from '../../shared/models/rappel';

@Injectable({
  providedIn: 'root',
})
export class RappelService {
  private httpclient = inject(HttpClient);

  private baseUrl = 'http://localhost:8090';

  getMyrappel(): Observable<RappelResponse[]> {
    return this.httpclient.get<RappelResponse[]>(`${this.baseUrl}/rappels/rappel-actif`, {
      withCredentials: true,
    });
  }
  getRappelsdus(): Observable<RappelResponse[]> {
    return this.httpclient.get<RappelResponse[]>(`${this.baseUrl}/rappels/dus`, {
      withCredentials: true,
    });
  }

  createRappel(rappel: Rappel): Observable<RappelResponse> {
    return this.httpclient.post<RappelResponse>(`${this.baseUrl}/rappels/create`, rappel, {
      withCredentials: true,
    });
  }
}
