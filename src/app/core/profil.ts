import { Service } from '@angular/core';
import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Citoyen } from '../features/dashboard/citoyen/citoyen';
import { catchError, Observable, of, tap } from 'rxjs';

@Service()
export class Profil {

  private http = inject(HttpClient);

private apiUrl = 'http://localhost:8090';
modifierCitoyen(id:number,infoCitoyen:Citoyen){
 return this.http
       .get(`${this.apiUrl}/citoyen/${id},${infoCitoyen}`, {
         withCredentials: true,
       })

}
  citoyenById(id:number): Observable<any>{
        return this.http
      .get(`${this.apiUrl}/citoyen/${id}`,  {
        withCredentials: true,
      })

  }
}
