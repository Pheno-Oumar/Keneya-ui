export interface ConseilResponse {
    id: number;
    titre: string;
    contenu: string;
    typeConseil: 'RECOMMANDATION' | 'CONSEIL';
    userId: number;
    categorieNom: string;
    archive: boolean;
    dateCreation: string;
    dateModif: string;
}

export interface ConseilDTORequest {
    titre: string;
    typeConseil: 'RECOMMANDATION' | 'CONSEIL';
    categorieNom: string;
    contenu: string;
}

export interface ConseilResponseInterface {
    success: boolean;
    message: string;
    data: ConseilResponse[]; 
    date: string;
}

