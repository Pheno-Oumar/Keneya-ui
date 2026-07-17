export type FrequenceRappel = 'Fixe' | 'Variable';

export type StatutRappel = 'a_prendre' | 'pris' | 'termine';

export type OngletRappel = 'aujourdhui' | 'a_venir' | 'termines';

export interface RappelMedical {
  id: string;
  nomMedicament: string;
  dosage: string;
  dateDebut: string;
  dateFin?: string;
  dateRappel: string;
  heureRappel?: string;
  frequence: FrequenceRappel;
  intervalle: string;
  statut: StatutRappel;
}

export interface RappelPayload {
  nomMedicament: string;
  dosage: string;
  dateDebut: string;
  dateFin?: string;
  dateRappel: string;
  heureRappel?: string;
  frequence: FrequenceRappel;
  intervalle: string;
}