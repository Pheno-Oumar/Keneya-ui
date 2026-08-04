import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatActionList } from "@angular/material/list";
import { CategorieActiviteService } from '../../../../core/services/categorie-activite/categorie-activite-service';
import { CategorieActiviteInterface } from '../../../models/CategorieActivite';

@Component({
  selector: 'app-categorie-activite-dialog',
  imports: [MatButtonModule, MatDialogModule, ReactiveFormsModule, MatIconModule, MatFormFieldModule, MatInput, MatActionList],
  templateUrl: './categorie-activite-dialog.html',
  styleUrl: './categorie-activite-dialog.css',
})
export class CategorieActiviteDialog {
  private dialogRef = inject(MatDialogRef<CategorieActiviteDialog>);
  private service = inject(CategorieActiviteService);
   data = inject(MAT_DIALOG_DATA);

  form = new FormGroup({
    libelle: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('')
  });

  ngOnInit() {

    if (this.data?.mode === 'edit') {

      this.form.patchValue({
        libelle: this.data.categorie.libelle,
        description: this.data.categorie.description
      });

    }

  }

  enregistrer() {

    if (this.form.invalid) {
      return;
    }

    const categorie = this.form.getRawValue() as CategorieActiviteInterface;

    if (this.data?.mode === 'edit') {

      this.service
        .modifier(this.data.categorie.id, categorie)
        .subscribe({
          next: () => this.dialogRef.close(true),
          error: err => console.log(err)
        });

    } else {

      this.service
        .ajouterCategorieActivite(categorie)
        .subscribe({
          next: () => this.dialogRef.close(true),
          error: err => console.log(err)
        });

    }

  }

  close() {
    this.dialogRef.close();
  }
}
