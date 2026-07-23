import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { ActiviteInterface } from '../../../shared/models/Activite';

@Service()
export class activiteService {
    private apiUrl = "http://localhost:8090/activites";

    private http = inject(HttpClient);

    ajouter(categorie: ActiviteInterface) {
        return this.http.post(`${this.apiUrl}`, categorie, { withCredentials: true })
    }
    // getall(): Observable<CategorieActiviteResponseInterface> {
    //     return this.http.get<CategorieActiviteResponseInterface>(`${this.apiUrl}/categorie-activites`, { withCredentials: true })
    //}

    delete(id: number) {
        console.log("l'id dans le service: " + id)
        return this.http.delete(`${this.apiUrl}/${id}`, { withCredentials: true })
    }

    modifier(id: number, categorie: ActiviteInterface) {
        return this.http.put(`${this.apiUrl}/${id}`, categorie, { withCredentials: true })
    }
}
