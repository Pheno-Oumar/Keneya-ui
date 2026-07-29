import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-detail-categorie-conseil-dialog',
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './detail-categorie-conseil-dialog.html',
  styleUrls: ['./detail-categorie-conseil-dialog.css'],
})
export class DetailCategorieConseilDialog {
    data = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<DetailCategorieConseilDialog>)

  close() {
    this.dialogRef.close(false);
  }

}



