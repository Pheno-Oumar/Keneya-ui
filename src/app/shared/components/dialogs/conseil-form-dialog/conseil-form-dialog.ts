import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSelect, MatOption } from "@angular/material/select";
import { CategorieConseilService } from '../../../../core/services/categorie-conseil-service/categorie-conseil-service';
import { ConseilDTORequest } from '../../../models/Conseil';
import { ConseilService } from '../../../../core/services/conseil/conseil-service';
import { CategorieConseil } from '../../../models/CategorieConseilResponse';

@Component({
  selector: 'app-conseil-form-dialog',
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatDialogModule, MatSelect, MatOption],
  templateUrl: './conseil-form-dialog.html',
  styleUrls: ['./conseil-form-dialog.css'],
})
export class ConseilFormDialog {
  private dilogRef = inject(MatDialogRef<ConseilFormDialog>);
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
    console.log("ng init lancee")
    this.categorieService.getCategories().subscribe({
      next: (response) => {
        this.categories = response;
        console.log(`response ${response}`)
        console.log(this.categories);
      }
    })
  }


  inscrire(): void {
    console.log("bienvenue")
    if (this.form.valid) {
      console.log("form valide")
      const conseil: ConseilDTORequest = this.form.getRawValue() as unknown as ConseilDTORequest;
      console.log(conseil);
      this.conseilService.ajouter(conseil).subscribe(
        {
          next: response => {
            this.response = response;
            this.dilogRef.close(true);
          },
          error: err => { console.log(err) },
          complete: () => { console.log("Requete terminer") }
        }
      );
    }
  }


  close() {
    this.dilogRef.close(false);
  }
}



