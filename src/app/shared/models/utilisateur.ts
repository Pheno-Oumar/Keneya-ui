export interface Utilisateur {
  id: number;
  prenom: string;
  nom: string;
  photoUrl?: string;
  nbNotifications?: number;
  email: string;
  role: 'CITOYEN' | 'ADMIN' | 'AGENT';
}

