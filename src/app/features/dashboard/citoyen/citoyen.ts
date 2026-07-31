import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Utilisateur } from '../../../shared/models/utilisateur';
import { RappelMedical } from '../../../shared/models/rappel';
import { RappelService } from '../../../core/services/rappel-service/rappels';

@Component({
  selector: 'app-citoyen',
  imports: [RouterLink],
  templateUrl: './citoyen.html',
  styleUrls: ['./citoyen.css'],
})
export class Citoyen implements OnInit {

  utilisateur?: Utilisateur;
  resume?: any;
  rappelsAVenir: RappelMedical[] = [];
  chargementEnCours = false;

  private cdr = inject(ChangeDetectorRef);

  // Conservé pour plus tard
  private rappelService = inject(RappelService);

  ngOnInit(): void {

    console.log('✅ Dashboard citoyen chargé');

    // ============================
    // AUDIT : appels API désactivés
    // ============================

    
    this.chargementEnCours = true;

    this.rappelService.obtenirTous().subscribe({
      next: (response) => {
        console.log('Chargement rappels OK', response);
        this.rappelsAVenir = response;
        this.chargementEnCours = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erreur chargement rappels', err);
        this.chargementEnCours = false;
      }
    });
    

  }

}


