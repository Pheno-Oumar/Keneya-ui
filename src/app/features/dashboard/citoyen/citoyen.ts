import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router'; // 1. AJOUT de l'import pour le lien
import { Utilisateur } from '../../../shared/models/utilisateur';
import { RappelMedical } from '../../../shared/models/rappel';
import { RappelService } from '../../../core/services/rappels';

@Component({
  selector: 'app-citoyen',
  imports: [RouterLink],
  templateUrl: './citoyen.html',
  styleUrl: './citoyen.css',
})
export class Citoyen implements OnInit {
  utilisateur?: Utilisateur;
  resume?: any; // Gardé en 'any' car commenté dans vos modèles
  rappelsAVenir: RappelMedical[] = [];
  chargementEnCours = true;

  private rappelService = inject(RappelService);

  ngOnInit(): void {
    this.rappelService.obtenirTous().subscribe({
      next: (response) => {
        console.log("chargement complet", response);
        this.rappelsAVenir = response; // 3. CORRECTION : On stocke les données reçues
        this.chargementEnCours = false; // 4. CORRECTION : On coupe le chargement
      },
      error: (err) => {
        console.log("chargement failed", err);
        this.chargementEnCours = false;
      }
    });
  }
}