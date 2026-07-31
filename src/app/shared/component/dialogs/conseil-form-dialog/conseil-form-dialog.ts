import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSelect, MatOption } from "@angular/material/select";
import { CategorieConseilService } from '../../../../core/services/categorie-conseil-service/categorie-conseil-service';
import { ConseilDTORequest } from '../../../models/Conseil';
import { ConseilService } from '../../../../core/services/conseil/conseil-service';
import { CategorieConseil } from '../../../models/CategorieConseilResponse';
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-conseil-form-dialog',
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatDialogModule, MatSelect, MatOption, MatIconModule],
  templateUrl: './conseil-form-dialog.html',
  styleUrl: './conseil-form-dialog.css',
})
export class ConseilFormDialog {
   dialogRef = inject(MatDialogRef<ConseilFormDialog>);
   data = inject(MAT_DIALOG_DATA, { optional: true });
  private conseilService = inject(ConseilService);
  private categorieService = inject(CategorieConseilService);
  private response: object | undefined;
  private fb = inject(FormBuilder);
  form = this.fb.group({
    titre: ['', [Validators.required, Validators.minLength(3)]],
    contenu: ['', [Validators.required, Validators.minLength(3)]],
    typeConseil: ['', Validators.required],
    nomCategorie: ['', Validators.required]
  });
  categories: CategorieConseil[] = []
  ngOnInit() {

    this.categorieService.getCategories().subscribe({
      next: (response) => {
        this.categories = response;
      }
    });

    if (this.data?.mode === 'edit') {

      this.form.patchValue({
        titre: this.data.conseil.titre,
        contenu: this.data.conseil.contenu,
        typeConseil: this.data.conseil.typeConseil,
        nomCategorie: this.data.conseil.categorieNom
      });

    }

  }

  enregistrer(): void {

    if (this.form.invalid) {
      return;
    }

    const conseil = this.form.getRawValue() as unknown as ConseilDTORequest;

    if (this.data?.mode === 'edit') {

      this.conseilService
        .modifier(this.data.conseil.id, conseil)
        .subscribe({
          next: () => this.dialogRef.close(true),
          error: err => console.log(err)
        });

    } else {

      this.conseilService
        .ajouter(conseil)
        .subscribe({
          next: () => this.dialogRef.close(true),
          error: err => console.log(err)
        });

    }

  }


  close() {
    this.dialogRef.close(false);
  }
}
