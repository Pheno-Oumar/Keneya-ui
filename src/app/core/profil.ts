import { Service } from '@angular/core';
import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Citoyen } from '../features/dashboard/citoyen/citoyen';
import { catchError, Observable, of, tap } from 'rxjs';
import { UserResponse } from '../shared/models/User';

@Service()
export class Profil {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8090';
  modifierCitoyen(id: number, infoCitoyen: Citoyen) {
    return this.http.get(`${this.apiUrl}/citoyen/${id},${infoCitoyen}`, {
        withCredentials: true,
      })

  }

  citoyen(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.apiUrl}/me`, {withCredentials: true})
  }
}
