

export interface ResumeJour {
  nbRappelsDuJour: number;
  nbActivites: number;
  activitesLabel: string; 
}


export interface Rappel {
         
        nom_medicament: string;
        dateDebut: Date;
        dateFin: Date ;
        dateRappel: Date ;
        dateCreation: Date ;
        archive: boolean,
        frequence: "FIXE" |"VARIABLE",
        intervalle: number,
}