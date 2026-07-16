import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { PlanEditComponent } from '../plan-edit/plan-edit';
import { PlanAddComponent } from '../plan-add/plan-add';
@Component({
  selector: 'app-activity-detail',
  standalone: true,
  imports: [CommonModule, 
            MatDialogModule, 
            MatButtonModule, 
            MatIconModule,
            ],
  templateUrl: './plan-detail.html',
  styleUrls: ['./plan-detail.css']
})
export class PlanDetailComponent {
  constructor(
    public dialogRef: MatDialogRef<PlanDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close() { this.dialogRef.close(); }

  onEdit() {
    this.dialogRef.close('edit'); // On renvoie 'edit' pour dire à la liste d'ouvrir la popup de modif
  }
}