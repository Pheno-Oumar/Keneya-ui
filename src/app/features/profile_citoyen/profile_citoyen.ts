import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
export class ProfilCitoyen implements OnInit {
  profilForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.profilForm = this.fb.group({
      nom: [''],
      prenom: [''],
      email: [''],
      password: [''],
      telephone: ['']
    });
  }

  onSubmit(): void {
    if (this.profilForm.valid) {
      console.log('Formulaire mis à jour :', this.profilForm.value);
    }
  }
}