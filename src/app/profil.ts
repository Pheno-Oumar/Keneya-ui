import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Description de la structure des données d'un citoyen
export interface Citoyen {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  password?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CitoyenService {

  private apiUrl = 'http://localhost:8080/api/citoyens';

  constructor(private http: HttpClient) {}

  // 1. Récupérer le profil du citoyen connecté
  getProfil(id: number): Observable<Citoyen> {
    return this.http.get<Citoyen>(`${this.apiUrl}/${id}`);
  }

  

  // 2. Mettre à jour le profil du citoyen
  updateProfil(id: number, citoyen: Citoyen): Observable<Citoyen> {
    return this.http.put<Citoyen>(`${this.apiUrl}/${id}`, citoyen);
    
  }
}