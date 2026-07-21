import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Utilisateur } from '../../../shared/models/utilisateur';
import { Rappel, RappelResponse, ResumeJour } from '../../../shared/models/rappel';
import { HeaderCitoyen } from '../../../layout/header/header-citoyen/header-citoyen';
import { RappelService } from '../../../core/services/rappel-service';
import { DatePipe, SlicePipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-citoyen',
  imports: [HeaderCitoyen, SlicePipe, DatePipe, RouterLink, RouterLinkActive],
  templateUrl: './citoyen.html',
  styleUrl: './citoyen.css',
})
export class Citoyen implements OnInit {
  utilisateur?: Utilisateur;
  resume?: ResumeJour;
  rappelsAVenir: RappelResponse[] = [];

  chargementEnCours = true;
  private cdr = inject(ChangeDetectorRef);

  private rappelService = inject(RappelService);

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
