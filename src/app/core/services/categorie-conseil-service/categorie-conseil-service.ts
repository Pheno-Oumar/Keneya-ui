import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategorieConseilInterface } from '../../../shared/models/CategorieConseil';
import { Observable } from 'rxjs';
import { CategorieConseilResponseInterface } from '../../../shared/models/CategorieConseilResponse';

@Injectable({
    providedIn: 'root'
})
export class CategorieConseilService {
    private apiUrl = "http://localhost:8090/categories-conseils";

    private http = inject(HttpClient);

    ajouterConseilActivite(categorie: CategorieConseilInterface) {
        return this.http.post(`${this.apiUrl}`, categorie, { withCredentials: true })
    }

    getCategories(): Observable<CategorieConseilResponseInterface> {
            return this.http.get<CategorieConseilResponseInterface>(`${this.apiUrl}`, { withCredentials: true })
        }
    
        delete(id: number) {
            console.log("l'id dans le service: " + id)
            return this.http.delete(`${this.apiUrl}/${id}`, { withCredentials: true })
        }
    
        modifier(id: number,categorie: CategorieConseilInterface) {
            return this.http.put(`${this.apiUrl}/${id}`,categorie, { withCredentials: true })
        }
}
