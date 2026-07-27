import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse, Rappel, RappelResponse } from '../../shared/models/rappel';
import { NotificationResponse } from '../../shared/models/Notification';

@Injectable({
  providedIn: 'root',
})
export class RappelService {
  private httpclient = inject(HttpClient);

  private baseUrl = 'http://localhost:8080';

  getMyrappel(): Observable<RappelResponse[]> {
    return this.httpclient.get<RappelResponse[]>(`${this.baseUrl}/rappels/rappel-actif`, {
      withCredentials: true,
    });
  }
  getRappelsdus(): Observable<NotificationResponse<RappelResponse>[]> {
    return this.httpclient.get<NotificationResponse<RappelResponse>[]>(
      `${this.baseUrl}/notification`,
      {
        withCredentials: true,
      },
    );
  }
  marqueCommeLus(id: number): Observable<void> {
    return this.httpclient.post<void>(
      `${this.baseUrl}/notification/${id}`,
      {},
      {
        withCredentials: true,
      },
    );
  }

  createRappel(rappel: Rappel): Observable<RappelResponse> {
    return this.httpclient.post<RappelResponse>(`${this.baseUrl}/rappels/create`, rappel, {
      withCredentials: true,
    });
  }
  rappelTerminer(): Observable<RappelResponse[]> {
    return this.httpclient.get<RappelResponse[]>(`${this.baseUrl}/rappels/rappels-terminer`, {
      withCredentials: true,
    });
  }
}
