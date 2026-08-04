import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from "@angular/material/button";
import { AuthService } from '../../../core/services/auth-service';
import { RegisterInterface } from '../../../shared/models/register';
import { Router, RouterLink } from '@angular/router';
import { NotificationService } from '../../../shared/services/notification.service';
@Component({
  selector: 'app-register',
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  private authService = inject(AuthService);
  private response: object | undefined;
  private router = inject(Router);
  private notification = inject(NotificationService);
  form = new FormGroup({
    nom: new FormControl('', [Validators.required, Validators.minLength(3)]),
    prenom: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    telephone: new FormControl('', [Validators.minLength(8)]),
    dateNaissance: new FormControl('')
  })

  inscrire(): void {
    if (this.form.valid) {
      const registerr: RegisterInterface = this.form.getRawValue() as unknown as RegisterInterface;
      console.log(registerr);
      this.authService.register(registerr).subscribe(
        {
          next: response => {
            this.response = response;
            this.router.navigate(["/login"]);
            this.notification.success("Inscription réussie avec succès");
          },
          error: err => { console.log(err) 
            this.notification.error("Erreur veuillez réprendre");
          },
          complete: () => { console.log("Requete terminer") }
        }
      );
    }
  }

}
