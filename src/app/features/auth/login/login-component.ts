import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../core/services/auth-service';
import { RouterLink, Router } from '@angular/router';
import { NotificationService } from '../../../shared/services/notification.service';

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
    RouterLink,
  ],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  notification = inject(NotificationService);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(64)
        
      ]],
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      this.authService.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          this.isLoading = false;
          localStorage.setItem('role', response.data);
          console.log(localStorage.getItem('role'));
          this.notification.success("Connexion réussie avec succès");

          if (response.success === true) {
            console.log(' Connexion réussie ! Le cookie de session est stocké par le navigateur.',
            );
          } else {
            this.errorMessage = response.message || 'Identifiants incorrects.';
          }
          const role = response.data.role
          if (role == "CITOYEN") {
            this.router.navigate(['/citoyen']);
          } else if (role == "ADMIN") {
            this.router.navigate(['/admin']);
          }
          else if (role== "AGENT") {
            this.router.navigate(['/agent']);
          }
          else {
            this.router.navigate(['/agent']);
          }

        },
        error: (error: HttpErrorResponse) => {
          this.isLoading = false;

          if (error.status === 401 || error.status === 403) {
            this.errorMessage = 'Email ou mot de passe incorrect.';
          } else {
            this.errorMessage = 'Erreur du serveur. Veuillez réessayer plus tard.';
          }
          this.notification.error("Connnexion échouée");
        },
      });
    }
  }
}
