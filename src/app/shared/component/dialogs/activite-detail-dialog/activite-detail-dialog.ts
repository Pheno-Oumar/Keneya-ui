import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { ActiviteResponse } from '../../../models/Activite';
//import { ActiviteFormDialog } from '../activite-form-dialog/activite-form-dialog';
import { ActiviteService } from '../../../../core/services/activite/activite-service';

export interface ActiviteDetailDialogData {
  activite: ActiviteResponse;
  readonly?: boolean;
}

@Component({
  selector: 'app-activite-detail-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule
  ],
  templateUrl: './activite-detail-dialog.html',
  styleUrls: ['./activite-detail-dialog.css']
})
export class ActiviteDetailDialog {
  private dialog = inject(MatDialog);
  private service = inject(ActiviteService);
  private dialogRef = inject(MatDialogRef<ActiviteDetailDialog>);

  // Mapping des niveaux
  private niveauLabels: { [key: string]: string } = {
    'DEBUTANT': 'Débutant',
    'INTERMEDIAIRE': 'Intermédiaire',
    'AVANCE': 'Avancé',
    'EXPERT': 'Expert'
  };

  private niveauColors: { [key: string]: string } = {
    'DEBUTANT': 'primary',
    'INTERMEDIAIRE': 'accent',
    'AVANCE': 'warn',
    'EXPERT': 'warn'
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ActiviteDetailDialogData
  ) { }

  close(): void {
    this.dialogRef.close();
  }

  modifier(): void {
    this.dialogRef.close();
    // const dialogRef = this.dialog.open(ActiviteFormDialog, {
    //   width: '600px',
    //   maxHeight: '100%',
    //   data: {
    //     activite: this.data.activite,
    //     mode: 'edit'
    //   }
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     this.dialogRef.close({ updated: true });
    //   }
    // });
  }

  supprimer(): void {
    if (confirm(`Voulez-vous vraiment supprimer l'activité "${this.data.activite.nom}" ?`)) {
      this.service.archiver(this.data.activite.idActivites).subscribe({
        next: () => {
          this.dialogRef.close({ deleted: true });
        },
        error: (error) => {
          console.error('Erreur lors de la suppression', error);
        }
      });
    }
  }

  getNiveauColor(niveau: string): string {
    return this.niveauColors[niveau] || 'primary';
  }

  getNiveauLabel(niveau: string): string {
    return this.niveauLabels[niveau] || niveau;
  }

  getInitials(prenom: string, nom: string): string {
    if (!prenom && !nom) return '?';
    return (prenom?.charAt(0) || '') + (nom?.charAt(0) || '');
  }

  formatDate(date: string): string {
    if (!date) return 'Non renseigné';
    return new Date(date).toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }

  formatHeure(date: string): string {
    if (!date) return '';
    return new Date(date).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  formatDuree(duree: string | number): string {
    if (!duree) return '0 min';
    const minutes = typeof duree === 'string' ? parseInt(duree) : duree;
    if (isNaN(minutes)) return '0 min';

    if (minutes < 60) {
      return `${minutes} min`;
    }
    const heures = Math.floor(minutes / 60);
    const restMinutes = minutes % 60;
    return restMinutes > 0 ? `${heures}h ${restMinutes}min` : `${heures}h`;
  }
}