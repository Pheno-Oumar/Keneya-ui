import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Service } from '@angular/core';
import { ConseilDTORequest, ConseilResponseInterface } from '../../../shared/models/Conseil';
import { Observable } from 'rxjs';
inject

@Injectable({
    providedIn: 'root'
})
export class ConseilService {
    private apiUrl = "http://localhost:8090/conseils";

    private http = inject(HttpClient);

    ajouter(categorie: ConseilDTORequest) {
        return this.http.post(`${this.apiUrl}`, categorie, { withCredentials: true })
    }

    getAll(): Observable<ConseilResponseInterface> {
        return this.http.get<ConseilResponseInterface>(`${this.apiUrl}`, { withCredentials: true })
    }

    delete(id: number) {
        console.log("l'id dans le service: " + id)
        return this.http.delete(`${this.apiUrl}/${id}`, { withCredentials: true })
    }

    modifier(id: number, categorie: ConseilDTORequest) {
        return this.http.put(`${this.apiUrl}/${id}`, categorie, { withCredentials: true })
    }
}
