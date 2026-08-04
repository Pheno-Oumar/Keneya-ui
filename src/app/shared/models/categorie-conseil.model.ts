export interface Categorie {
  id?: number;          // Identifiant unique (généré par la BDD)
  nom: string;          // Nom de la catégorie
  description: string;  // Description textuelle
  archive: boolean;     // État d'archivage (false = actif, true = archivé)
}