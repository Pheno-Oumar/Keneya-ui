import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategorieActiviteInterface } from '../../../shared/models/CategorieActivite';
import { CategorieActiviteResponseInterface } from '../../../shared/models/CategorieActiviteResponse';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CategorieActiviteService {
    private apiUrl = `${environment.apiUrl}`;

    private http = inject(HttpClient);

    ajouterCategorieActivite(categorie: CategorieActiviteInterface) {
        return this.http.post(`${this.apiUrl}/categorie-activites`, categorie, { withCredentials: true })
    }
    getCategories(): Observable<CategorieActiviteResponseInterface> {
        return this.http.get<CategorieActiviteResponseInterface>(`${this.apiUrl}/categorie-activites`, { withCredentials: true })
    }

    delete(id: number) {
        console.log("l'id dans le service: " + id)
        return this.http.delete(`${this.apiUrl}/categorie-activites/${id}`, { withCredentials: true })
    }

    modifier(id: number,categorie: CategorieActiviteInterface) {
        return this.http.put(`${this.apiUrl}/categorie-activites/${id}`,categorie, { withCredentials: true })
    }
}

