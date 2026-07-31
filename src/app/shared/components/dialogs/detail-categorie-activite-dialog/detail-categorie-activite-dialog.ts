import { Component, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-detail-categorie-activite-dialog',
  imports: [MatDialogModule, MatButtonModule, MatIcon],
  templateUrl: './detail-categorie-activite-dialog.html',
  styleUrls: ['./detail-categorie-activite-dialog.css'],
})
export class DetailCategorieActiviteDialog {
  data = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<DetailCategorieActiviteDialog>)

  close() {
    this.dialogRef.close(false);
  }

}



