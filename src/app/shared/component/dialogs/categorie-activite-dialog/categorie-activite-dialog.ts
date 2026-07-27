import { Component,inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule,MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatActionList } from "@angular/material/list";
import { CategorieActiviteService } from '../../../../core/services/categorie-activite/categorie-activite-service';
import {CategorieActiviteInterface} from '../../../models/CategorieActivite';

@Component({
  selector: 'app-categorie-activite-dialog',
  imports: [MatButtonModule, MatDialogModule, ReactiveFormsModule, MatIconModule, MatFormFieldModule, MatInput, MatActionList],
  templateUrl: './categorie-activite-dialog.html',
  styleUrl: './categorie-activite-dialog.css',
})
export class CategorieActiviteDialog {
  private dialogRef = inject(MatDialogRef<CategorieActiviteDialog>);
  private service = inject(CategorieActiviteService);


  form = new FormGroup({
    libelle: new FormControl('',[Validators.required,Validators.minLength(3)]),
    description: new FormControl('')
  });

  ajouter(){
    if(this.form.valid){
      console.log("le formulaire est correct.")
      const categorie: CategorieActiviteInterface= this.form.getRawValue() as unknown  as CategorieActiviteInterface;
          this.service.ajouterCategorieActivite(categorie).subscribe(
            {
              next: response =>{
                console.log(`la reponse de la requete ${response}`);
                this.dialogRef.close(true);
              },
              error: err =>{
                console.log(err);
              },
              complete: () =>{
                console.log("request terminer");
              }
            }
          );
    }
  }

  close(){
    this.dialogRef.close();
  }
}
