import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { Clipboard } from '@angular/cdk/clipboard';
import { AgentDTOResponse } from '../../../models/agent';
import { AgentFormDialog } from '../agent-form-dialog/agent-form-dialog';
import { AgentService } from '../../../../core/services/agent/agent-service';

export interface AgentDetailDialogData {
  agent: AgentDTOResponse;
  readonly?: boolean;
}

@Component({
  selector: 'app-agent-detail-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatTooltipModule
  ],
  templateUrl: './agent-detail-dialog.html',
  styleUrls: ['./agent-detail-dialog.css']
})
export class AgentDetailDialog {
  private dialog = inject(MatDialog);
  private service = inject(AgentService);
  private dialogRef = inject(MatDialogRef<AgentDetailDialog>);
  private clipboard = inject(Clipboard);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AgentDetailDialogData
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  modifier(): void {
    this.dialogRef.close();
    const dialogRef = this.dialog.open(AgentFormDialog, {
      width: '600px',
      maxHeight: '100%',
      data: { 
        agent: this.data.agent, 
        mode: 'edit' 
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close({ updated: true });
      }
    });
  }

  // toggleArchive(): void {
  //   const action = this.data.agent.archive ? 'désarchiver' : 'archiver';
  //   if (confirm(`Voulez-vous vraiment ${action} l'agent "${this.data.agent.prenom} ${this.data.agent.nom}" ?`)) {
  //     this.service.toggleArchive(this.data.agent.id, !this.data.agent.archive).subscribe({
  //       next: (response) => {
  //         this.data.agent.archive = !this.data.agent.archive;
  //         this.dialogRef.close({ updated: true });
  //       },
  //       error: (error) => {
  //         console.error(`Erreur lors du ${action} de l'agent`, error);
  //       }
  //     });
  //   }
  // }

  supprimer(): void {
    if (confirm(`Voulez-vous vraiment supprimer l'agent "${this.data.agent.prenom} ${this.data.agent.nom}" ?`)) {
      this.service.delete(this.data.agent.id).subscribe({
        next: () => {
          this.dialogRef.close({ deleted: true });
        },
        error: (error) => {
          console.error('Erreur lors de la suppression', error);
        }
      });
    }
  }

  getInitials(prenom: string, nom: string): string {
    if (!prenom && !nom) return '?';
    return (prenom?.charAt(0) || '') + (nom?.charAt(0) || '');
  }

  formatDate(date: string | Date): string {
    if (!date) return 'Non renseigné';
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  copyToClipboard(text: string): void {
    if (text) {
      this.clipboard.copy(text);
      // Vous pouvez ajouter un snackbar ici
      // this.snackBar.open('Copié dans le presse-papier', 'Fermer', { duration: 2000 });
    }
  }
}