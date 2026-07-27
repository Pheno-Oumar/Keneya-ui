import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { AuthService } from '../../../core/services/auth-service';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {

  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(100)
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64)
        ]
      ]
    });

  }

  login(): void {

    this.errorMessage = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const credentials = {
      email: this.loginForm.value.email.trim().toLowerCase(),
      password: this.loginForm.value.password
    };

    this.authService.login(credentials).subscribe({

      next: (response: any) => {

        this.isLoading = false;

        console.log('Réponse du backend :', response);

        if (!response.success) {
          this.errorMessage = response.message ?? 'Connexion impossible.';
          return;
        }

        // Sauvegarde du rôle
        localStorage.setItem('role', response.data);

        switch (response.data) {

          case 'ADMIN':
            this.router.navigate(['/admin/agents']);
            break;

          case 'AGENT':
            this.router.navigate(['/agent/publications']);
            break;

          case 'CITOYEN':
            this.router.navigate(['/citoyen']);
            break;

          default:
            this.errorMessage = 'Rôle inconnu.';
        }

      },

      error: (error: HttpErrorResponse) => {

        this.isLoading = false;

        switch (error.status) {

          case 0:
            this.errorMessage = 'Impossible de contacter le serveur.';
            break;

          case 400:
            this.errorMessage = 'Veuillez vérifier les informations saisies.';
            break;

          case 401:
            this.errorMessage = 'Email ou mot de passe incorrect.';
            break;

          case 403:
            this.errorMessage = "Votre compte n'est pas autorisé.";
            break;

          case 404:
            this.errorMessage = 'Service introuvable.';
            break;

          case 429:
            this.errorMessage = 'Trop de tentatives. Réessayez plus tard.';
            break;

          case 500:
            this.errorMessage = 'Erreur interne du serveur.';
            break;

          default:
            this.errorMessage = 'Une erreur inattendue est survenue.';
        }

        console.error(error);

      }

    });

  }

}