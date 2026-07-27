
export interface AgentRequestInterface {
    nom: string;
    prenom: string;
    email: string;
    password: string;
    telephone?: string;
    specialite: string;
}

export interface AgentResponse{
    success: boolean;
    message: string;
    data: AgentResponseInterface[];
    date: string;
}

export interface AgentResponseInterface {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    password: string;
    telephone?: string;
    specialite: string;
}