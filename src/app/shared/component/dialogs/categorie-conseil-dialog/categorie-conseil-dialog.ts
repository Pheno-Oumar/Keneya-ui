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
import { CategorieConseilInterface } from '../../../models/CategorieConseil';
import { CategorieConseilService } from '../../../../core/services/categorie-conseil-service/categorie-conseil-service';

@Component({
  selector: 'app-categorie-activite-dialog',
  imports: [MatButtonModule, MatDialogModule, ReactiveFormsModule, MatIconModule, MatFormFieldModule, MatInput, MatActionList],
  templateUrl: './categorie-conseil-dialog.html',
  styleUrl: './categorie-conseil-dialog.css',
})
export class CategorieConseilDialog {
  private dialogRef = inject(MatDialogRef<CategorieConseilDialog>);
  private service = inject(CategorieConseilService);


  form = new FormGroup({
    nom: new FormControl('',[Validators.required,Validators.minLength(3)]),
    description: new FormControl('')
  });

  ajouter(){
    if(this.form.valid){
      console.log("le formulaire est correct.")
      const categorie: CategorieConseilInterface= this.form.getRawValue() as unknown  as CategorieConseilInterface;
          this.service.ajouterConseilActivite(categorie).subscribe(
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
    this.dialogRef.close(false);
  }
}
