import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Pour le *ngFor
import { RouterModule } from '@angular/router'; // Pour le routerLink
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PlanDetailComponent } from '../plan-detail/plan-detail';
import { PlanAddComponent } from '../plan-add/plan-add';
import { PlanEditComponent } from '../plan-edit/plan-edit';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-activity-list',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    MatButtonModule, 
    MatIconModule, 
    MatCardModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatDialogModule
  ],
  templateUrl: './plan-list.html',
  styleUrls: ['./plan-list.css']
})
export class PlanListComponent {
  private dialog = inject(MatDialog);
  activities = [
    { name: 'Course à pieds', sessions: 3, icon: 'directions_run', color: 'red' },
    { name: 'Natation', sessions: 2, icon: 'pool', color: 'blue' },
    { name: 'Yoga', sessions: 5, icon: 'self_improvement', color: 'indigo' }
  ];
  

  openDetails(activity: any) {
    const dialogRef = this.dialog.open(PlanDetailComponent, {
      data: activity,
      width: '700px',
      maxWidth: '90vw',
     panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'edit') {
        this.openEdit(activity);
      }
    });
  }

  openAdd() {
    this.dialog.open(PlanAddComponent, { width: '600px' });
  }

  openEdit(activity: any) {
    this.dialog.open(PlanEditComponent, {
      data: activity,
      width: '700px',
      maxWidth: '90vw',

    });
  }
}