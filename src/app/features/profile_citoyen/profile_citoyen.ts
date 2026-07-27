import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AuthService } from '../../core/services/auth-service';
import { CitoyenProfil } from '../../shared/models/CitoyenProfil';
import { Citoyen } from '../dashboard/citoyen/citoyen';

@Component({
  selector: 'app-profil_citoyen',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './profile_citoyen.html',
  styleUrl: './profile_citoyen.css'
})
export class profile {

//   profilForm!: FormGroup;

//   constructor(
//     private authService: AuthService,
//     private fb: FormBuilder
//   ) {}
// profil!:CitoyenProfil;
//   ngOnInit(): void {

//     this.profilForm = this.fb.group({
//       nom: [''],
//       prenom: [''],
//       email: [''],
//       password: [''],
//       telephone: ['']
//     });

//     const id = this.authService.user()?.id;

//     if (id) {
//       this.authService.citoyenById(id).subscribe({
//         next: (citoyen: CitoyenProfil) => {
//           this.profil=citoyen;
//           this.profilForm.patchValue({
//       nom: citoyen.nom,
//       prenom: citoyen.prenom,
//       email: citoyen.email,
//       password: citoyen.password,
//       telephone: citoyen.telephone
//     });
//         },
//         error: (err) => {
//           console.error(err);
//         }
//       });
//     }
//   }

//   modifier(): void {

//     const id = this.authService.user()?.id;

//     if (!id) {
//       return;
//     }

//     const citoyen: CitoyenProfil = {
//       id: id,
//       nom: this.profilForm.value.nom ?? '',
//       prenom: this.profilForm.value.prenom ?? '',
//       email: this.profilForm.value.email ?? '',
//       password: this.profilForm.value.password ?? '',
//       telephone: this.profilForm.value.telephone ?? ''
//     };

//     this.authService.modifierCitoyen(id, citoyen).subscribe({
//       next: (res) => {
//         console.log("Profil modifié avec succès", res);
//       },
//       error: (err) => {
//         console.error(err);
//       }
//     });
//   }

}