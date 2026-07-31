import { Injectable ,inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgentRequestInterface, AgentResponse } from '../../../shared/models/agent';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class AgentService {
    private http = inject(HttpClient);
    private baseUrl: string = `${environment.apiUrl}/agents`;

    ajouterAgent(agent: AgentRequestInterface){
        console.log("agent avant l'insertion "+agent)
        return this.http.post(`${this.baseUrl}`,agent, {withCredentials: true});
    }
    getAll():Observable<AgentResponse>{
        return this.http.get<AgentResponse>(`${this.baseUrl}`, {withCredentials: true});
    }

    delete(id: number){
        return this.http.delete(`${this.baseUrl}/${id}`, {withCredentials: true});
    }

    modifier(id: number , agent: AgentRequestInterface){
        return this.http.put(`${this.baseUrl}/${id}`,agent, {withCredentials: true})
    }
}

