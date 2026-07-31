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
  templateUrl: './citoyen.html',
  styleUrl: './citoyen.css',
})
export class Citoyen implements OnInit {
  utilisateur?: Utilisateur;
  resume?: ResumeJour;
  rappelsAVenir: RappelResponse[] = [];

  chargementEnCours = true;
  private cdr = inject(ChangeDetectorRef);
  publication = signal<Publication | undefined>(undefined);
  private rappelService = inject(RappelService);
  private publicationService = inject(PublicationService);

  ngOnInit() {
    this.getRappel();
    this.getLastPublication();
  }

  getRappel() {
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

  getLastPublication() {
    this.publicationService.getMyPublications().subscribe({
      next: (res: APIResponse<Publication[]>) => this.publication.set(res.data.at(-1)),
      error: (err) => console.log(err),
      complete: () => console.log(this.publication()),
    });
  }
}
