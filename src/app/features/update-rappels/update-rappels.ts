import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { finalize } from 'rxjs';
import { RappelResponse } from '../../shared/models/rappel';
import { RappelService } from '../../core/services/rappels';
import { CreateRappelsComponent } from '../create-rappels/create-rappels';
@Component({
  selector: 'app-update-rappels',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './update-rappels.html',
  styleUrl: './update-rappels.css',
})
export class UpdateRappelsComponent implements OnInit {
  rappels: RappelResponse[] = [];
  chargement = false;

  readonly colonnesAffichees = [
    'nom_medicament',
    'dateDebut',
    'dateRappel',
    'frequence',
    'intervalle',
    'archive',
  ];

  constructor(
    private rappelService: RappelService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.chargerRappels();
  }

  chargerRappels(): void {
    this.chargement = true;
    this.rappelService
      .obtenirTous()
      .pipe(finalize(() => (this.chargement = false)))
      .subscribe({
        next: (data) => (this.rappels = data),
        error: (err) => console.error('Erreur chargement des rappels', err),
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