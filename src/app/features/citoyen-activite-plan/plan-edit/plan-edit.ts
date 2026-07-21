import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { ActiviteService } from '../services/activite.service';
import { CitoyenActivitePlanService } from '../services/citoyen-activite-plan.service';

import { Activite } from '../models/activite.model';
import { CitoyenActivitePlan } from '../models/citoyen-activite-plan.model';
import { ApiResponse } from '../../../shared/models/api-response.model';

@Component({
  selector: 'app-plan-edit',
  standalone: true,
  templateUrl: './plan-edit.html',
  styleUrls: ['./plan-edit.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class PlanEditComponent implements OnInit {

  private fb = inject(FormBuilder);

  private activiteService = inject(ActiviteService);

  private planService = inject(CitoyenActivitePlanService);

  dialogRef = inject(MatDialogRef<PlanEditComponent>);

  activites: Activite[] = [];

  form!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: CitoyenActivitePlan
  ) {}

  ngOnInit(): void {

    this.form = this.fb.group({

      idActivite: [
        this.data.idActivite,
        Validators.required
      ],

      plannings: this.fb.array([])

    });

    this.loadActivites();

    this.loadPlannings();
  }

  loadActivites() {

    this.activiteService.getAll().subscribe({

      next:(response:ApiResponse<Activite[]>)=>{

        this.activites=response.data;

      }

    });

  }

  loadPlannings(){

    this.data.plannings.forEach(p=>{

      this.plannings.push(

        this.fb.group({

          jour:[p.jour,Validators.required],

          heure:[p.heure,Validators.required]

        })

      );

    });

  }

  get plannings():FormArray{

    return this.form.get('plannings') as FormArray;

  }

  addPlanning(){

    this.plannings.push(

      this.fb.group({

        jour:['',Validators.required],

        heure:['',Validators.required]

      })

    );

  }

  removePlanning(index:number){

    this.plannings.removeAt(index);

  }

  update(){

    const request={

      idCitoyen:2,

      idActivite:this.form.value.idActivite,

      plannings:this.form.value.plannings

    };

    this.planService.update(

      this.data.idCitoyenActivitePlan!,

      request

    ).subscribe({

      next:()=>{

        this.dialogRef.close(true);

      },

      error:console.error

    });

  }

  close(){

    this.dialogRef.close();

  }

}