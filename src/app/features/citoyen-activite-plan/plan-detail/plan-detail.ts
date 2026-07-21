import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule
} from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { CitoyenActivitePlan } from '../models/citoyen-activite-plan.model';

@Component({
  selector: 'app-plan-detail',
  standalone: true,
  templateUrl: './plan-detail.html',
  styleUrls: ['./plan-detail.css'],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class PlanDetailComponent {

  dialogRef = inject(MatDialogRef<PlanDetailComponent>);

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: CitoyenActivitePlan
  ) {}

  close() {

    this.dialogRef.close();

  }

  onEdit() {

    this.dialogRef.close("edit");

  }

}