import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ActiviteResponse, ActiviteResponseInterface } from '../../../shared/models/Activite';

@Injectable({
    providedIn: 'root'
})
export class CitoyenActivitePlanService {
    private apiUrl = 'http://localhost:8090/api/citoyen-activite-plan';
    private panierSubject = new BehaviorSubject<ActiviteResponse[]>([]);
    public panier$ = this.panierSubject.asObservable();

    constructor(private http: HttpClient) { }

    validerSelection(activiteIds: number[]): Observable<ActiviteResponseInterface> {
        return this.http.post<ActiviteResponseInterface>(`${this.apiUrl}/valider`, { activiteIds });
    }
  
}