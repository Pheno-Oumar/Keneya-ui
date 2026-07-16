import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-plan',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    MatButtonModule, 
    MatIconModule, 
    MatFormFieldModule, 
    MatSelectModule
  ],
  templateUrl: './plan-edit.html',
  styleUrls: ['./plan-edit.css']
})
export class PlanEditComponent {

  constructor(
    public dialogRef: MatDialogRef<PlanEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close() { this.dialogRef.close(); }
}