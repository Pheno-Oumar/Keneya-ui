
export interface AgentRequestInterface {
    nom: string;
    prenom: string;
    email: string;
    password: string;
    telephone?: string;
    specialite: string;
}

export interface AgentResponse {
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

export interface AgentDTOResponse {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    specialite: string;
    archive: boolean;
    dateCreation: string | Date;
    dateModif?: string | Date; // Si disponible
    statistiques?: AgentStatistiques; // Optionnel
}

export interface AgentStatistiques {
    totalActivites: number;
    activitesEnCours: number;
    activitesTerminees: number;
    tauxParticipation: number;
}

export interface APIResponse<T> {
    success: boolean;
    message: string;
    data: T;
}