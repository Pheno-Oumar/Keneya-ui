// export interface Agent {
//   id?: number;
//   nom: string;
//   prenom: string;
//   specialite: string;
// }

export interface Publication {
    id?: number;
    nomMaladie: string;
    symptome: string;
    conseilPreventif: string;
    source: string;
    archive?: boolean;    //C'est optionnel, car on peut considérer que par défaut une publication n'est pas archivée    
    dateCreation: Date;
    //agent?: Agent;            // Relation avec l'Agent

    // Attributs locaux pour l'UI
    likes?: number;
    dislikes?: number;
}
