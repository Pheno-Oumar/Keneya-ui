import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { finalize } from 'rxjs';
import { RappelService } from '../../../core/services/rappel-service/rappels';
// import { RappelFormulaireDialogComponent } from '../rappel-formulaire-dialog/rappel-formulaire-dialog.component';
import { CreateRappelsComponent } from '../create-rappels/create-rappels';
import { RappelMedical, OngletRappel } from '../../../shared/models/rappel';
  
@Component({
  selector: 'app-rappels-list',
  standalone: true,
  imports: [CommonModule, MatTabsModule, MatButtonModule, MatIconModule],
  templateUrl: './rappels-list.html',
  styleUrls: ['./rappels-list.css'],
})
export class RappelsList implements OnInit {
  rappels: RappelMedical[] = [];
  chargement = false;
  ongletActif: OngletRappel = 'aujourdhui';

  readonly onglets: { cle: OngletRappel; libelle: string }[] = [
    { cle: 'aujourdhui', libelle: "Aujourd'hui" },
    { cle: 'a_venir', libelle: 'A venir' },
    { cle: 'termines', libelle: 'Terminés' },
  ];

  constructor(
    private rappelService: RappelService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.chargerRappels();
  }

  changerOnglet(index: number): void {
    this.ongletActif = this.onglets[index].cle;
    this.chargerRappels();
  }

  chargerRappels(): void {
    this.chargement = true;
    this.rappelService
      .obtenirParOnglet(this.ongletActif)
      .pipe(finalize(() => (this.chargement = false)))
      .subscribe({
        next: (data) => (this.rappels = data),
        error: (err) => console.error('Erreur chargement des rappels', err),
      });
  }

  marquerCommePris(rappel: RappelMedical): void {
    this.rappelService.marquerCommePris(rappel.id).subscribe({
      next: () => this.chargerRappels(),
      error: (err) => console.error('Erreur mise à jour du rappel', err),
    });
  }

  ouvrirDialogAjout(): void {
    const ref = this.dialog.open(CreateRappelsComponent, {
      width: '480px',
    });

    ref.afterClosed().subscribe((cree) => {
      if (cree) {
        this.chargerRappels();
      }
    });
  }
}
