import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CategorieActiviteService } from '../../../../core/services/categorie-activite/categorie-activite-service';

@Component({
  selector: 'app-supprimer-categorie-activite-dialog',
  imports: [MatDialogModule, MatIconModule,MatButtonModule],
  templateUrl: './supprimer-categorie-activite-dialog.html',
  styleUrls: ['./supprimer-categorie-activite-dialog.css'],
})
export class SupprimerCategorieActiviteDialog {
  private service = inject(CategorieActiviteService);
  data = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<SupprimerCategorieActiviteDialog>)

  close() {
    this.dialogRef.close(false);
  }

  supprimer(id: number) {
    console.log(`l'id de la categorie est ${id}`)
    this.service.delete(id).subscribe();
    this.dialogRef.close(true);
  }

}



