import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from "@angular/material/button";
import { AgentService } from '../../../../core/services/agent/agent-service';
import { AgentRequestInterface } from '../../../models/agent';
import { Router } from '@angular/router';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSelect, MatOption } from "@angular/material/select";
import { CategorieActiviteService } from '../../../../core/services/categorie-activite/categorie-activite-service';
import { CategorieActivite } from '../../../models/CategorieActiviteResponse';
import { ActiviteService } from '../../../../core/services/activite/activite-service';
import { ActiviteInterface } from '../../../models/Activite';


@Component({
  selector: 'app-agent-form-dialog',
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatDialogModule, MatSelect, MatOption],
  templateUrl: './activite-form-dialog.html',
  styleUrl: './activite-form-dialog.css',
})
export class ActivitetFormDialog {
  private dilogRef = inject(MatDialogRef<ActivitetFormDialog>);
  private activiteService = inject(ActiviteService);
  private categorieService = inject(CategorieActiviteService);
  private response: object | undefined;
  private router = inject(Router);
  private fb = inject(FormBuilder);
  form = this.fb.group({
    nom: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(3)]],
    niveau: ['', Validators.required],
    duree: ['', [Validators.required]],
    idCategorie: ['', Validators.required]
  });
  categories: CategorieActivite[] = []
  ngOnInit() {
    console.log("ng init lancee")
    this.categorieService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.data
      }
    })
  }

  inscrire(): void {
    console.log("bienvenue")
    if (this.form.valid) {
      console.log("form valide")
      const conseil: ActiviteInterface = this.form.getRawValue() as unknown as ActiviteInterface;
      console.log(conseil);
      this.activiteService.ajouter(conseil).subscribe(
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
