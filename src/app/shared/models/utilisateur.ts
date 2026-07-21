export interface Utilisateur {
  id: number;
  prenom: string;
  nom: string;
  photoUrl?: string;
  nbNotifications?: number;
  email: string;
  phone: 'CITOYEN' | 'ADMIN' | 'AGENT';
}
