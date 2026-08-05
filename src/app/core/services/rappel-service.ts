import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
<<<<<<< HEAD
import { Rappel, RappelResponse } from '../../shared/models/rappel';
=======
import { APIResponse, Rappel, RappelResponse } from '../../shared/models/rappel';
import { NotificationResponse } from '../../shared/models/Notification';
>>>>>>> 9223e7748230b867f05cfe1c2ab64c706a0f911e

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

  suprimerRappel(id: number): Observable<void> {
    return this.httpclient.delete<void>(`${this.baseUrl}/rappels/delete/${id}`, {
      withCredentials: true,
    });
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
