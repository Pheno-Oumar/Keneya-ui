<<<<<<< HEAD
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router'; // 1. AJOUT de l'import pour le lien
import { Utilisateur } from '../../../shared/models/utilisateur';
import { RappelMedical } from '../../../shared/models/rappel';
import { RappelService } from '../../../core/services/rappels';

@Component({
  selector: 'app-citoyen',
  imports: [RouterLink],
=======
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Utilisateur } from '../../../shared/models/utilisateur';
import { Rappel, RappelResponse, ResumeJour } from '../../../shared/models/rappel';
import { HeaderCitoyen } from '../../../layout/header/header-citoyen/header-citoyen';
import { RappelService } from '../../../core/services/rappel-service';
import { DatePipe, SlicePipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-citoyen',
  imports: [SlicePipe, DatePipe, RouterLink, RouterLinkActive],
>>>>>>> fe5e72181e2dd4a81360e6b5fa2283508068ae03
  templateUrl: './citoyen.html',
  styleUrl: './citoyen.css',
})
export class Citoyen implements OnInit {
  utilisateur?: Utilisateur;
<<<<<<< HEAD
  resume?: any; // Gardé en 'any' car commenté dans vos modèles
  rappelsAVenir: RappelMedical[] = [];
=======
  resume?: ResumeJour;
  rappelsAVenir: RappelResponse[] = [];

>>>>>>> fe5e72181e2dd4a81360e6b5fa2283508068ae03
  chargementEnCours = true;
  private cdr = inject(ChangeDetectorRef);

  private rappelService = inject(RappelService);

<<<<<<< HEAD
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
=======
  ngOnInit() {
    this.rappelService.getMyrappel().subscribe({
      next: (response) => {
        this.chargementEnCours = false;
        this.rappelsAVenir = response;
      },

      error: (err) => console.log('chargement failed', err),
      complete: () => {
        console.log(this.rappelsAVenir);
        this.cdr.detectChanges();
      },
    });
  }
}
>>>>>>> fe5e72181e2dd4a81360e6b5fa2283508068ae03
