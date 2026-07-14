import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../core/services/auth-service';
import { RouterLink, Router } from "@angular/router";

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    RouterLink
  ],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,// On garde juste le service pour l'appel API
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      this.authService.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          this.isLoading = false;
          localStorage.setItem("role", response.data);
          // ✅ On affiche juste la réponse du backend dans la console
          console.log('✅ Réponse du backend reçue :', response);
          console.log(localStorage.getItem("role"))

          if (response.success === true) {
            console.log('🎉 Connexion réussie ! Le cookie de session est stocké par le navigateur.');
            // Plus tard, on ajoutera : this.router.navigate(['/dashboard']);
          } else {
            // Si le backend renvoie success: false
            this.errorMessage = response.message || 'Identifiants incorrects.';
          }

          if (response.data == "CITOYEN") {
            this.router.navigate(['/citoyen']);
          } else if (response.data == "ADMIN") {
            this.router.navigate(['/admin']);
          }
          else if (response.data == "AGENT") {
            this.router.navigate(['/agent']);
          }
          else{
            this.router.navigate(['/agent']);
          }

        },
        error: (error: HttpErrorResponse) => {
          this.isLoading = false;
          console.error('❌ Erreur de l\'appel HTTP :', error);

          if (error.status === 401 || error.status === 403) {
            this.errorMessage = 'Email ou mot de passe incorrect.';
          } else {
            this.errorMessage = 'Erreur du serveur. Veuillez réessayer plus tard.';
          }
        }
      });
    }
  }
}