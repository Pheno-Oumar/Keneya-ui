export interface ConseilItem {
  id: number;
  titre: string;
  contenu: string;
  image: string;
  categorie: 'Nutrition' | 'Sommeil' | 'Activité' | 'Bien-être';
}

// Simple service without Angular-specific imports to avoid module resolution errors
export class ConseilService {
  private apiUrl = 'http://localhost:8080/conseils';

  // Use fetch to retrieve conseils. Returns a Promise to avoid rxjs/http dependency.
  getConseils(): Promise<ConseilItem[]> {
    return fetch(this.apiUrl).then(res => {
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return res.json() as Promise<ConseilItem[]>;
    });
  }
}