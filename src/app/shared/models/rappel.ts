
export interface ResumeJour {
        nbRappelsDuJour: number;
        nbActivites: number;
        activitesLabel: string;
}

export type StatutRappel = 'a_prendre' | 'pris' | 'termine';
export type OngletRappel = 'aujourdhui' | 'a_venir' | 'termines';

export interface RappelMedical {
        id: string;
        nomMedicament: string;
        dosage: string;
        heureRappel: string;
        dateDebut: string;
        dateRappel: string;
        frequence: string;
        intervalle: number;
        statut: StatutRappel;
        archive: boolean;
}

export interface RappelPayload {
        nomMedicament: string;
        dosage: string;
        dateDebut: string;
        dateFin?: string;
        dateRappel: string;
        frequence: 'Fixe' | 'Variable';
        intervalle: number;
}

export interface Rappel {
        nom_medicament: string;
        dateDebut: Date;
        dateFin: Date;
        dateRappel: Date;
        dateCreation: Date;
        archive: boolean;
        frequence: 'FIXE' | 'VARIABLE';
        intervalle: number;
}

export interface RappelResponse {
        id: number;
        nom_medicament: string;
        dateDebut: Date;
        dateFin: Date;
        dateRappel: Date;
        dateCreation: Date;
        archive: boolean;
        frequence: 'FIXE' | 'VARIABLE';
        intervalle: number;
}