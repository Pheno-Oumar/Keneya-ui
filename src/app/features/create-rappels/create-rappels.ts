import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { RappelPayload } from '../../shared/models/rappel';
import { RappelService } from '../../core/services/rappels';
// import { Component, inject } from '@angular/core'; // 1. A

@Component({
  selector: 'app-create-rappels',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
  ],
  templateUrl: './create-rappels.html',
  styleUrl: './create-rappels.css',
})
export class CreateRappelsComponent {
  private fb = inject(FormBuilder);
  enregistrement = false;

  formulaire = this.fb.group({
    nomMedicament: ['', Validators.required],
    dateDebut: [null as Date | null, Validators.required],
    dateFin: [null as Date | null],
    dateRappel: [null as Date | null, Validators.required],
    intervalle: ['', Validators.required],
    frequence: ['', Validators.required],
  });

  constructor(
    private rappelService: RappelService,
    private dialogRef: MatDialogRef<CreateRappelsComponent>
  ) {}

  annuler(): void {
    this.dialogRef.close(false);
  }

  enregistrer(): void {
    if (this.formulaire.invalid) {
      this.formulaire.markAllAsTouched();
      return;
    }

    const valeur = this.formulaire.getRawValue();
    const payload: RappelPayload = {
      nomMedicament: valeur.nomMedicament!,
      dosage: '1 comprimé',
      dateDebut: this.versDateIso(valeur.dateDebut!),
      dateFin: valeur.dateFin ? this.versDateIso(valeur.dateFin) : undefined,
      dateRappel: this.versDateIso(valeur.dateRappel!),
      frequence: valeur.frequence as 'Fixe' | 'Variable',
      intervalle: valeur.intervalle!,
    };

    this.enregistrement = true;
    this.rappelService.creer(payload).subscribe({
      next: () => {
        this.enregistrement = false;
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.enregistrement = false;
        console.error('Erreur création du rappel', err);
      },
    });
  }

  private versDateIso(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}