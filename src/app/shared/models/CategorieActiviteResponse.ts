export interface CategorieActiviteResponseInterface {
    success: boolean;
    message: string;
    data: CategorieActivite[]; // Remplace l'ancien "object" par un vrai tableau typé
    date: string;
}

export interface CategorieActivite {
    id: number;
    libelle: string;
    description: string;
}
