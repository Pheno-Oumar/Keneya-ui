import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ActiviteInterface, ActiviteResponseInterface } from '../../../shared/models/Activite';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class ActiviteService {
    private apiUrl = "http://localhost:8090/activites";

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

    archiver(id: number) {
        console.log("l'id dans le service: " + id)
        return this.http.patch(`${this.apiUrl}/${id}/archiver`,{}, { withCredentials: true })
    }

    modifier(id: number, categorie: ActiviteInterface) {
        return this.http.put(`${this.apiUrl}/${id}`, categorie, { withCredentials: true })
    }
}
