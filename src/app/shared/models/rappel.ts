export interface ResumeJour {
  nbRappelsDuJour: number;
  nbActivites: number;
  activitesLabel: string;
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

export interface APIResponse<T> {
  status: string;
  data: T;
  message: string;
}
