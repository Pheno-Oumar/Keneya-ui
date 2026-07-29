export interface ResumeJour {
  nbRappelsDuJour: number;
  nbActivites: number;
  activitesLabel: string;
}

export type StatutRappel = 'a_prendre' | 'pris' | 'termine';
export type OngletRappel = 'aujourdhui' | 'a_venir' | 'termines';

export interface Rappel {
  nom_medicament: string;
  dateDebut: string;
  dateFin: string;
  dateRappel: string;
  dateCreation: string;
  archive: boolean;
  frequence: "FIXE" | "VARIABLE";
  intervalle: number;
}

export interface RappelResponse {
  id: number;
  nom_medicament: string;
  dosage: string;
  dateDebut: string;
  dateFin: string;
  dateRappel: string;
  dateCreation: string;
  archive: boolean;
  frequence: "FIXE" | "VARIABLE";
  intervalle: number;
  statut: StatutRappel;
  heureRappel: string;
}

export type RappelMedical = RappelResponse;

export interface RappelPayload {
  nom_medicament: string;
  dosage: string;
  dateDebut: string;
  dateFin?: string;
  dateRappel: string;
  frequence: "FIXE" | "VARIABLE";
  intervalle: number;
}
