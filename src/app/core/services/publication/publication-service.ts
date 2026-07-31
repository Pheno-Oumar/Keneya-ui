import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publication } from '../../../shared/models/Publication';
 
@Injectable({
  providedIn: 'root' // Permet d'injecter le service partout sans l'enregistrer dans les providers
})
export class PublicationService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/publications';

  
  // Si ton backend renvoie un objet avec une propriété "content" (Spring Boot Pageable)
    getMyPublications(): Observable<any> { 
     return this.http.get<any>(`${this.baseUrl}`, { withCredentials: true });
  }

  // Ajouter une publication
  createPublication(pub: Publication): Observable<Publication> {
    return this.http.post<Publication>(`${this.baseUrl}`, pub, { withCredentials: true });
  }

  // Supprimer une publication
  deletePublication(id: number): Observable<void> { //Les routes doivent etre conformer aux routes du backend
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { withCredentials: true });
  }

  // Optionnel : Modifier une publication si le backend le gère
  updatePublication(pub: Publication): Observable<Publication> {
    return this.http.put<Publication>(`${this.baseUrl}/${pub.id}`, pub, { withCredentials: true });
  }
}