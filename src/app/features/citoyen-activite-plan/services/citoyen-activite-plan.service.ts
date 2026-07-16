import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

import { CitoyenActivitePlan } from '../models/citoyen-activite-plan.model';
import { CitoyenActivitePlanRequest } from '../models/citoyen-activite-plan-request.model';

@Injectable({
  providedIn: 'root'
})
export class CitoyenActivitePlanService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = `${environment.apiUrl}/api/plans`;
  

  getAll(): Observable<CitoyenActivitePlan[]> {
    return this.http.get<CitoyenActivitePlan[]>(this.apiUrl);
  }

  getById(id: number): Observable<CitoyenActivitePlan> {
    return this.http.get<CitoyenActivitePlan>(
      `${this.apiUrl}/${id}`
    );
  }

  create(
    request: CitoyenActivitePlanRequest
  ): Observable<CitoyenActivitePlan> {

    return this.http.post<CitoyenActivitePlan>(
      this.apiUrl,
      request
    );
  }

 
  update(
    id: number,
    request: CitoyenActivitePlanRequest
  ): Observable<CitoyenActivitePlan> {

    return this.http.put<CitoyenActivitePlan>(
      `${this.apiUrl}/${id}`,
      request
    );
  }

 
  delete(id: number): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }

}