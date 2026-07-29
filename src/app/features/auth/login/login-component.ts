import { Component, OnInit } from '@angular/core';
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

import { AuthService } from '../../../core/auth/auth-service';

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
  styleUrls: ['./login-component.css'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  hidePassword = true;

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

  ngOnInit(): void {
    // Vérifier si l'utilisateur est déjà connecté
    const role = this.authService.getRole();
    if (role) {
      this.redirigerSelonRole(role);
    }
  }

  login(): void {
    this.errorMessage = '';

    // Vérifier si le formulaire est valide
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      
      // Message d'erreur personnalisé selon le champ invalide
      if (this.loginForm.get('email')?.invalid) {
        const emailErrors = this.loginForm.get('email')?.errors;
        if (emailErrors?.['required']) {
          this.errorMessage = 'Veuillez saisir votre adresse email.';
        } else if (emailErrors?.['email']) {
          this.errorMessage = 'Veuillez saisir une adresse email valide.';
        }
      } else if (this.loginForm.get('password')?.invalid) {
        const passwordErrors = this.loginForm.get('password')?.errors;
        if (passwordErrors?.['required']) {
          this.errorMessage = 'Veuillez saisir votre mot de passe.';
        } else if (passwordErrors?.['minlength']) {
          this.errorMessage = 'Le mot de passe doit contenir au moins 8 caractères.';
        }
      }
      
      return;
    }

    this.isLoading = true;

    // Préparer les identifiants
    const credentials = {
      email: this.loginForm.value.email.trim().toLowerCase(),
      password: this.loginForm.value.password
    };

    // Log pour déboguer
    console.log('📤 Envoi des credentials:', credentials);

    // Appel au service d'authentification
    this.authService.login(credentials).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        
        console.log('📥 Réponse complète du backend:', response);
        console.log('✅ Success:', response?.success);
        console.log('💬 Message:', response?.message);
        console.log('👤 Data:', response?.data);

        // Vérifier le succès de la connexion
        if (!response || !response.success) {
          this.errorMessage = response?.message || 'Échec de la connexion.';
          return;
        }

        // Vérifier la présence des données utilisateur
        if (!response.data) {
          this.errorMessage = 'Données utilisateur manquantes dans la réponse.';
          console.error('❌ Pas de data dans la réponse');
          return;
        }

        const userData = response.data;
        
        const role = (userData as any).role;
        
        console.log('🎭 Rôle récupéré:', role);

        if (!role) {
          this.errorMessage = 'Rôle utilisateur non trouvé.';
          console.error('❌ Pas de rôle trouvé dans:', userData);
          return;
        }

        this.redirigerSelonRole(role);
      },

      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
        
        console.error('❌ Erreur HTTP:', error);
        console.error('📊 Status:', error.status);
        console.error('📝 Message:', error.message);
        console.error('🔍 Error body:', error.error);

        // Gestion des erreurs détaillée
        switch (error.status) {
          case 0:
            this.errorMessage = '❌ Impossible de contacter le serveur. Vérifiez que le backend est accessible.';
            break;
            
          case 400:
            // Erreur de validation - afficher les détails si disponibles
            if (error.error?.message) {
              this.errorMessage = error.error.message;
            } else if (error.error?.data) {
              // Si le backend renvoie des erreurs de validation par champ
              const errors = error.error.data;
              const messages = Object.values(errors).join(', ');
              this.errorMessage = `Erreur de validation : ${messages}`;
            } else {
              this.errorMessage = 'Données invalides. Vérifiez le format de l\'email et du mot de passe.';
            }
            break;
            
          case 401:
            this.errorMessage = '❌ Email ou mot de passe incorrect.';
            break;
            
          case 403:
            this.errorMessage = '❌ Votre compte n\'est pas autorisé à se connecter.';
            break;
            
          case 404:
            this.errorMessage = '❌ Service d\'authentification introuvable. Vérifiez l\'URL.';
            break;
            
          case 429:
            this.errorMessage = '❌ Trop de tentatives de connexion. Veuillez réessayer dans quelques minutes.';
            break;
            
          case 500:
            this.errorMessage = '❌ Erreur interne du serveur. Veuillez contacter l\'administrateur.';
            break;
            
          default:
            this.errorMessage = `❌ Erreur inattendue (${error.status}). Veuillez réessayer.`;
        }
      }
    });
  }

  /**
   * Redirige l'utilisateur selon son rôle
   */
  private redirigerSelonRole(role: string): void {
    console.log('🚀 Redirection selon le rôle:', role);
    
    const roleUpper = role.toUpperCase();
    
    switch (roleUpper) {
      case 'ADMIN':
        console.log('➡️ Redirection vers le tableau de bord ADMIN');
        this.router.navigate(['/admin/agents']);
        break;
        
      case 'AGENT':
        console.log('➡️ Redirection vers le tableau de bord AGENT');
        this.router.navigate(['/agent/publications']);
        break;
        
      case 'CITOYEN':
        console.log('➡️ Redirection vers le tableau de bord CITOYEN');
        this.router.navigate(['/citoyen']);
        break;
        
      default:
        console.error('❌ Rôle inconnu:', role);
        this.errorMessage = `Rôle "${role}" non reconnu. Contactez l'administrateur.`;
    }
  }

  /**
   * Retourne les messages d'erreur pour le champ email
   */
  getErrorMessageEmail(): string {
    const control = this.loginForm.get('email');
    if (control?.hasError('required')) {
      return 'L\'email est obligatoire';
    }
    if (control?.hasError('email')) {
      return 'Format d\'email invalide';
    }
    if (control?.hasError('maxlength')) {
      return 'L\'email ne doit pas dépasser 100 caractères';
    }
    return '';
  }

  /**
   * Retourne les messages d'erreur pour le champ mot de passe
   */
  getErrorMessagePassword(): string {
    const control = this.loginForm.get('password');
    if (control?.hasError('required')) {
      return 'Le mot de passe est obligatoire';
    }
    if (control?.hasError('minlength')) {
      return 'Le mot de passe doit contenir au moins 8 caractères';
    }
    if (control?.hasError('maxlength')) {
      return 'Le mot de passe ne doit pas dépasser 64 caractères';
    }
    return '';
  }
}


