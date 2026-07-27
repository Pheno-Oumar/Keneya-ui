// @ts-nocheck
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

// 1. Importer le service et l'interface
import { ConseilService, ConseilItem } from '../../services/conseil.service';

@Component({
  selector: 'app-conseils',
  standalone: true,
  imports: [
    CommonModule, 
    MatSidenavModule, 
    MatListModule, 
    MatIconModule, 
    MatButtonModule
  ],
  templateUrl: './conseils.html',
  styleUrls: ['./conseils.css']
})
export class ConseilsComponent implements OnInit {
  categories = ['Tous', 'Nutrition', 'Bien-être', 'Sommeil', 'Activité'];
  categorieSelectionnee = 'Tous';

  // 2. Le tableau démarre vide
  conseils: ConseilItem[] = [];

  // 3. Injection de ConseilService
  constructor(private conseilService: ConseilService) {}

  // 4. Chargement au démarrage du composant
  ngOnInit(): void {
    this.chargerConseils();
  }

  chargerConseils(): void {
    const result = this.conseilService.getConseils();
    // Supporter à la fois Observable et Promise retournés par le service
    if (result && typeof (result as any).subscribe === 'function') {
      (result as any).subscribe({
        next: (donnees: ConseilItem[]) => {
          this.conseils = donnees; // Remplit le tableau avec les données de la BDD
        },
        error: (err: any) => {
          console.error('Erreur lors du chargement des conseils :', err);
        }
      });
    } else if (result && typeof (result as any).then === 'function') {
      (result as Promise<ConseilItem[]>)
        .then((donnees: ConseilItem[]) => {
          this.conseils = donnees;
        })
        .catch((err: any) => {
          console.error('Erreur lors du chargement des conseils :', err);
        });
    } else {
      console.error('getConseils() a retourné un type inattendu:', result);
    }
  }

  // 5. Ta logique de filtrage d'origine conservée
  get conseilsFiltres() {
    return this.categorieSelectionnee === 'Tous' 
      ? this.conseils 
      : this.conseils.filter(c => c.categorie === this.categorieSelectionnee);
  }

  selectCategorie(cat: string) {
    this.categorieSelectionnee = cat;
  }
}