
export interface ActiviteInterface {
    nom: string;
    description: string;
    niveau: string;
    idCategorie: number;
    duree: string;
}

export interface ActiviteResponse {
    idActivites: number;
    nomAgent: string;
    prenomAgent: string;
    categorieActivite: string;
    nom: string;
    date: string;
    description: string;
    niveau: string;
    duree: string;
}

export interface ActiviteResponseInterface {
    success: boolean;
    message: string;
    data: ActiviteResponse[];
    date: string;
}

export enum TypeNiveauEnum {
  DEBUTANT = 'DEBUTANT',
  INTERMEDIAIRE = 'INTERMEDIAIRE',
  AVANCE = 'AVANCE',
  EXPERT = 'EXPERT'
}
