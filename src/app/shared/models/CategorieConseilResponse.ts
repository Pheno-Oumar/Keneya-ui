export interface CategorieConseilResponseInterface {
    success: boolean;
    message: string;
    data: CategorieConseil[]; 
    date: string;
}

export interface CategorieConseil {
    id: number;
    nom: string;
    description: string;
}

