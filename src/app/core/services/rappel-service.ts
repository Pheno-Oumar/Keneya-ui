import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Rappel } from '../../shared/models/rappel';

@Injectable(
    {
        providedIn:"root"
    }
)
export class RappelService {
    private httpclient = inject(HttpClient)

    private baseUrl = "http://localhost:8080"

    getMyrappel ():Observable<Rappel>{
     return this.httpclient.get<Rappel>(`${this.baseUrl}/rappels/read`,{withCredentials:true})
    }
}
