import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../shared/models/api-response.model';
import { CitoyenActivitePlan } from '../models/citoyen-activite-plan.model';
import { CitoyenActivitePlanRequest } from '../models/citoyen-activite-plan-request.model';

@Injectable({
  providedIn: 'root'
})
export class CitoyenActivitePlanService {

  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/api/plans`;

  getAll(): Observable<ApiResponse<CitoyenActivitePlan[]>> {
    return this.http.get<ApiResponse<CitoyenActivitePlan[]>>(this.apiUrl);
  }

  getById(id: number): Observable<ApiResponse<CitoyenActivitePlan>> {
    return this.http.get<ApiResponse<CitoyenActivitePlan>>(
      `${this.apiUrl}/${id}`
    );
  }

 
  create(
    request: CitoyenActivitePlanRequest
  ): Observable<ApiResponse<CitoyenActivitePlan>> {
    return this.http.post<ApiResponse<CitoyenActivitePlan>>(
      this.apiUrl,
      request
    );
  }

  
  update(
    id: number,
    request: CitoyenActivitePlanRequest
  ): Observable<ApiResponse<CitoyenActivitePlan>> {
    return this.http.put<ApiResponse<CitoyenActivitePlan>>(
      `${this.apiUrl}/${id}`,
      request
    );
  }

 
  delete(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(
      `${this.apiUrl}/${id}`
    );
  }

}
