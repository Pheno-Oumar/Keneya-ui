import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { ActiviteInterface, ActiviteResponseInterface } from '../../../shared/models/Activite';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Service()
export class ActiviteService {
    private apiUrl = `${environment.apiUrl}/activites`;

    private http = inject(HttpClient);

    ajouter(categorie: ActiviteInterface) {
        return this.http.post(`${this.apiUrl}`, categorie, { withCredentials: true })
    }
    getAll(): Observable<ActiviteResponseInterface> {
         return this.http.get<ActiviteResponseInterface>(`${this.apiUrl}`, { withCredentials: true })
    }

    delete(id: number) {
        console.log("l'id dans le service: " + id)
        return this.http.delete(`${this.apiUrl}/${id}`, { withCredentials: true })
    }

    modifier(id: number, categorie: ActiviteInterface) {
        return this.http.put(`${this.apiUrl}/${id}`, categorie, { withCredentials: true })
    }
}

