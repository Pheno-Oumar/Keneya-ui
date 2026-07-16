import { Component, inject } from '@angular/core';
import { Utilisateur } from '../../../shared/models/utilisateur';
import { Rappel, ResumeJour } from '../../../shared/models/rappel';
import { HeaderCitoyen } from '../../../layout/header/header-citoyen/header-citoyen';
import { RappelService } from '../../../core/services/rappel-service';

@Component({
  selector: 'app-citoyen',
  imports: [HeaderCitoyen],
  templateUrl: './citoyen.html',
  styleUrl: './citoyen.css',
})
export class Citoyen   {
  utilisateur?: Utilisateur;
  resume?: ResumeJour;
  rappelsAVenir: Rappel[] = [];
  chargementEnCours = true;

  private rappelService = inject(RappelService)

  ngOnInit(): void {
    this.rappelService.getMyrappel().subscribe({
      next: (response) => console.log("chargement complet", response),
      error: (err) => console.log("chargement failed",err)
    })
  }
  
}
