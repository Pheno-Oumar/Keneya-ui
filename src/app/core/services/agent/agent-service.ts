import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgentInterface } from '../../../shared/models/agent';

@Injectable({
  providedIn: 'root',
})
export class AgentService {
  private http = inject(HttpClient);
  private baseUrl: string = 'http://localhost:8080/agents';

  ajouterAgent(agent: AgentInterface) {
    console.log("agent avant l'insertion " + agent);
    return this.http.post(`${this.baseUrl}`, agent, { withCredentials: true });
  }
}
