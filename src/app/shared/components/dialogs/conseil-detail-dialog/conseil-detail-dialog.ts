import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { ConseilResponse } from '../../../models/Conseil';
import { ConseilFormDialog } from '../conseil-form-dialog/conseil-form-dialog';
import { ConseilService } from '../../../../core/services/conseil/conseil-service';

export interface ConseilDetailDialogData {
  conseil: ConseilResponse;
  readonly?: boolean;
}

@Component({
  selector: 'app-conseil-detail-dialog',
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
  templateUrl: './conseil-detail-dialog.html',
  styleUrls: ['./conseil-detail-dialog.css'],
})
export class ConseilDetailDialog {
  private dialog = inject(MatDialog);
  private service = inject(ConseilService);
  private dialogRef = inject(MatDialogRef<ConseilDetailDialog>);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConseilDetailDialogData
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  modifier(): void {
    this.dialogRef.close();
    const dialogRef = this.dialog.open(ConseilFormDialog, {
      width: '600px',
      maxHeight: '100%',
      data: { 
        conseil: this.data.conseil, 
        mode: 'edit' 
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Rafraîchir les données si nécessaire
        this.dialogRef.close({ updated: true });
      }
    });
  }

  supprimer(): void {
    if (confirm(`Voulez-vous vraiment supprimer le conseil "${this.data.conseil.titre}" ?`)) {
      this.service.delete(this.data.conseil.id).subscribe({
        next: () => {
          this.dialogRef.close({ deleted: true });
        },
        error: (error) => {
          console.error('Erreur lors de la suppression', error);
        }
      });
    }
  }

  getTypeColor(type: string): string {
    const colors: {[key: string]: string} = {
      'VIDEO': 'primary',
      'TEXTE': 'accent',
      'AUDIO': 'warn'
    };
    return colors[type] || 'primary';
  }

  getStatusColor(archive: boolean): string {
    return archive ? 'warn' : 'primary';
  }
}


