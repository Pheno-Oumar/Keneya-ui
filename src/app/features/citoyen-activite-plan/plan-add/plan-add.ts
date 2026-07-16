import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-plan',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    MatButtonModule, 
    MatIconModule, 
    MatFormFieldModule, 
    MatSelectModule
  ],
  templateUrl: './plan-add.html',
  styleUrls: ['./plan-add.css'],
})
export class PlanAddComponent {

  constructor(
    public dialogRef: MatDialogRef<PlanAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close() { this.dialogRef.close(); }
}