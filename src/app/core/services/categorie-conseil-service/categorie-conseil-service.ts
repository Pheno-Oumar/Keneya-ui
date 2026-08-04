import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categorie } from '../../../shared/models/categorie-conseil.model';

@Injectable({
 providedIn: 'root'
})
export class CategorieConseilService {

 private apiUrl = 'http://localhost:8090/categories-conseils';

 constructor(private http: HttpClient) {}

 /** Récupère la liste des catégories */
getAllCategories(): Observable<Categorie[]> {
  return this.http.get<Categorie[]>(this.apiUrl, { withCredentials: true });
}


 /** Récupère une catégorie par ID */
 getCategorieById(id: number): Observable<Categorie> {
  return this.http.get<Categorie>(`${this.apiUrl}/${id}`, { withCredentials: true });
 }

 /** Crée une catégorie */
 createCategorie(categorie: { nom: string; description: string }): Observable<Categorie> {
  return this.http.post<Categorie>(this.apiUrl, categorie, { 
   withCredentials: true 
  });
 }

 /** Modifie une catégorie */
 updateCategorie(id: number, categorie: Partial<Categorie>): Observable<Categorie> {
  return this.http.put<Categorie>(`${this.apiUrl}/${id}`, categorie, { 
   withCredentials: true 
  });
 }

 /** Archiver / Supprimer */
 deleteCategorie(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`, { 
   withCredentials: true 
  });
 }
}
