<<<<<<< HEAD
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Utilisateur } from '../../../shared/models/utilisateur';
import { RappelResponse } from '../../../shared/models/rappel';
import { RappelService } from '../../../core/services/rappels';

@Component({
  selector: 'app-citoyen',
  imports: [RouterLink],
=======
import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { Utilisateur } from '../../../shared/models/utilisateur';
import { Rappel, RappelResponse, ResumeJour } from '../../../shared/models/rappel';
import { HeaderCitoyen } from '../../../layout/header/header-citoyen/header-citoyen';
import { RappelService } from '../../../core/services/rappel-service';
import { DatePipe, SlicePipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PublicationService } from '../../../core/services/publication/publication-service';
import { Publication } from '../../../shared/models/Publication';
import { APIResponse } from '../../../shared/models/APIResponse';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from "@angular/material/icon";
@Component({
  selector: 'app-citoyen',
  imports: [SlicePipe, DatePipe, RouterLink, RouterLinkActive, MatButtonModule, MatCardModule, MatIcon],
>>>>>>> 9223e7748230b867f05cfe1c2ab64c706a0f911e
  templateUrl: './citoyen.html',
  styleUrl: './citoyen.css',
})
export class Citoyen implements OnInit {
  utilisateur?: Utilisateur;
  resume?: any; // Gardé en 'any' car commenté dans vos modèles
  rappelsAVenir: RappelResponse[] = [];
  chargementEnCours = true;
  private cdr = inject(ChangeDetectorRef);
  publication = signal<Publication | undefined>(undefined);
  private rappelService = inject(RappelService);
  private publicationService = inject(PublicationService);

<<<<<<< HEAD
  ngOnInit(): void {
    this.rappelService.obtenirTous().subscribe({
=======
  ngOnInit() {
    this.getRappel();
    this.getLastPublication();
  }

  getRappel() {
    this.rappelService.getMyrappel().subscribe({
>>>>>>> 9223e7748230b867f05cfe1c2ab64c706a0f911e
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

  getLastPublication() {
    this.publicationService.getMyPublications().subscribe({
      next: (res: APIResponse<Publication[]>) => this.publication.set(res.data.at(-1)),
      error: (err) => console.log(err),
      complete: () => console.log(this.publication()),
    });
  }
}
