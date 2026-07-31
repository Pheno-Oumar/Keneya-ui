import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { ActiviteResponseInterface } from '../../../shared/models/Activite';
import { Observable } from 'rxjs';

@Service()
export class CitoyenActiviteService {

    private apiUrl = "http://localhost:8090/citoyens-activites";

    private http = inject(HttpClient);

    ajouter(nomActivite: string) {
        return this.http.post(`${this.apiUrl}`, { nomActivite: nomActivite }, { withCredentials: true })
    }
    getAll(): Observable<ActiviteResponseInterface> {
         return this.http.get<ActiviteResponseInterface>(`${this.apiUrl}`, { withCredentials: true })
    }

    delete(nomActivite: string) {
        return this.http.delete(`${this.apiUrl}/${nomActivite}`, { withCredentials: true })
    }

    deleteAll() {
        return this.http.delete(`${this.apiUrl}`, { withCredentials: true })
    }
}
