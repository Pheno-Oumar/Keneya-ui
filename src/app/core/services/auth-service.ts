import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterInterface } from '../../shared/models/register';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient);


    private apiUrl = 'http://localhost:8080';

    login(credentials: { email: string, password: string }): Observable<any> {
        // TRÈS IMPORTANT : on ajoute withCredentials pour gérer les cookies HttpSession
        return this.http.post(`${this.apiUrl}/auth/login`, credentials, { withCredentials: true });
    }

    register(register: RegisterInterface) {
        console.log(`Dans le service le contenu de register ${register}`)
        return this.http.post(`${this.apiUrl}/citoyens`, register , { withCredentials : true});
    }
}