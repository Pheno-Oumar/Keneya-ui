import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Profil } from '../../core/profil';
import { UserRequestInterface, UserResponse } from '../../shared/models/User';
import { AuthService } from '../../core/services/auth-service';
import { CitoyenService } from '../../profil';

@Component({
  selector: 'app-profil-citoyen',
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
export class ProfilCitoyen implements OnInit {

  private userService = inject(Profil); 
  private authenService=inject(AuthService)
  private citoyenService=inject(CitoyenService)

  nom : string ="";
  prenom: string = "";
  email : string = "";
  telephone : string = "";
  motdepasse : string="";

  profilForm!: FormGroup;
  user?: UserRequestInterface;
  constructor(private fb: FormBuilder) {}
  idUserConnecte?: number;   

  ngOnInit(): void {
    this.idUserConnecte = this.authenService.user()!.id;
 this.userService.citoyen().subscribe({
      next: response =>{
        this.user = response.data;
      }

    });

    this.profilForm = this.fb.group({
      nom: [''],
      prenom: [''],
      email: [''],
      password: [''],
      telephone: ['']
    });

this.citoyenService.getProfil(this.idUserConnecte).subscribe({
  next:(data)=>{
    console.log("l'utilisateur connecté son id"+data.id)
    this.profilForm.patchValue(data);
  }
})


  }

  modifier(): void {

  if (this.profilForm.valid && this.idUserConnecte) {

    this.citoyenService.updateProfil(
      this.idUserConnecte,
      this.profilForm.value
    ).subscribe({
      next: (data) => {
        console.log("Les données de l'utilisateur modifié :", data);
      }
    });

  }

}

}