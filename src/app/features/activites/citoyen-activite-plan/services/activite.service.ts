import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../../../environments/environment';

import { ApiResponse } from '../../../../shared/models/api-response.model';

import { Activite } from '../models/activite.model';

@Injectable({
  providedIn: 'root'
})
export class ActiviteService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    `${environment.apiUrl}/activites`;

  getAll(): Observable<ApiResponse<Activite[]>> {

    return this.http.get<ApiResponse<Activite[]>>(this.apiUrl);

  }

  getById(id: number): Observable<ApiResponse<Activite>> {

    return this.http.get<ApiResponse<Activite>>(
      `${this.apiUrl}/${id}`
    );

  }

}
