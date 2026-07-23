import { Component, inject } from '@angular/core';
import { CategorieConseilService } from '../../../../core/services/categorie-conseil-service/categorie-conseil-service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-supprimer-categorie-conseil-dialog',
  imports: [MatDialogModule, MatIconModule,MatButtonModule],
  templateUrl: './supprimer-categorie-conseil-dialog.html',
  styleUrl: './supprimer-categorie-conseil-dialog.css',
})
export class SupprimerCategorieConseilDialog {
  private service = inject(CategorieConseilService);
  data = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<SupprimerCategorieConseilDialog>)

  close() {
    this.dialogRef.close(false);
  }

  supprimer(id: number) {
    console.log(`l'id de la categorie est ${id}`)
    this.service.delete(id).subscribe();
    this.dialogRef.close(true);
  }
}
