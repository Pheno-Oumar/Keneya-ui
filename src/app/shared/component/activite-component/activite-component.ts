import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ActivitetFormDialog } from '../dialogs/activite-form-dialog/activite-form-dialog';

@Component({
  selector: 'app-conseil-component',
  imports: [MatButtonModule],
  templateUrl: './activite-component.html',
  styleUrl: './activite-component.css',
})
export class ConseilComponent {
  private dialog = inject(MatDialog);

  ajouter() {
    this.dialog.open(ActivitetFormDialog, {
      width: '600px',
      maxHeight: '100%',
    });
  }
}