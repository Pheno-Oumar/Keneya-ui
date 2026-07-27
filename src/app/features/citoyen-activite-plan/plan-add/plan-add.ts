import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

import { ActiviteService } from '../services/activite.service';
import { CitoyenActivitePlanService } from '../services/citoyen-activite-plan.service';

import { Activite } from '../models/activite.model';
import { ApiResponse } from '../../../shared/models/api-response.model';

import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-plan-add',
  standalone: true,
  templateUrl: './plan-add.html',
  styleUrls: ['./plan-add.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ]
})
export class PlanAddComponent implements OnInit {

  private fb = inject(FormBuilder);

  private activiteService = inject(ActiviteService);

  private planService = inject(CitoyenActivitePlanService);

  private notification = inject(NotificationService);

  dialogRef = inject(MatDialogRef<PlanAddComponent>);

  activites: Activite[] = [];

  form!: FormGroup;

  ngOnInit(): void {

    this.form = this.fb.group({

      idActivite: [null, Validators.required],

      plannings: this.fb.array([])

    });

    this.loadActivites();
  }

  loadActivites() {

    this.activiteService.getAll().subscribe({

      next: (response: ApiResponse<Activite[]>) => {

        this.activites = response.data;

      },

      error: console.error

    });

  }

  get plannings(): FormArray {

    return this.form.get('plannings') as FormArray;

  }

  addPlanning() {

    this.plannings.push(

      this.fb.group({

        jour: ['', Validators.required],

        heure: ['', Validators.required]

      })

    );

  }

  removePlanning(index: number) {

    this.plannings.removeAt(index);

  }

  save() {

    if (this.form.invalid) return;

    const request = {

      idCitoyen: 2,

      idActivite: this.form.value.idActivite,

      plannings: this.form.value.plannings

    };

    this.planService.create(request).subscribe({

      next: (response) => {
        this.notification.success(
          "Plan ajouté avec succès"
        );

        

        this.dialogRef.close(response.data);

      },

      error:() => {

          this.notification.error(
            "Impossible d'ajouter le plan"
          );
          
        }

    });

  }

  close() {

    this.dialogRef.close();

  }

}