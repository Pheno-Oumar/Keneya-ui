import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publication } from '../../../shared/models/Publication';
import { APIResponse } from '../../../shared/models/APIResponse';
import { environment } from '../../../../environments/environment';
 
@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/publications`;

  getMyPublications(): Observable<APIResponse<Publication[]>> {
    return this.http.get<APIResponse<Publication[]>>(`${this.baseUrl}`, { withCredentials: true });
  }

  createPublication(pub: Publication): Observable<APIResponse<void>> {
    return this.http.post<APIResponse<void>>(`${this.baseUrl}`, pub, { withCredentials: true });
  }

  deletePublication(id: number): Observable<APIResponse<void>> {
    return this.http.delete<APIResponse<void>>(`${this.baseUrl}/${id}`, { withCredentials: true });
  }

  updatePublication(pub: Publication): Observable<APIResponse<void>> {
    return this.http.put<APIResponse<void>>(`${this.baseUrl}/${pub.id}`, pub, { withCredentials: true });
  }
}
