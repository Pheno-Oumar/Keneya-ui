import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { PlanAddComponent } from '../plan-add/plan-add';
import { PlanDetailComponent } from '../plan-detail/plan-detail';
import { PlanEditComponent } from '../plan-edit/plan-edit';

import { CitoyenActivitePlanService } from '../services/citoyen-activite-plan.service';

import { CitoyenActivitePlan } from '../models/citoyen-activite-plan.model';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'app-plan-list',
  standalone: true,
  templateUrl: './plan-list.html',
  styleUrls: ['./plan-list.css'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class PlanListComponent implements OnInit {

  private notification = inject(NotificationService);

  private dialog = inject(MatDialog);

  private service = inject(CitoyenActivitePlanService);

  plans = signal<CitoyenActivitePlan[]>([]);

  ngOnInit(): void {

    this.loadPlans();

  }

  loadPlans() {

  this.service.getAll().subscribe({
  next: (response) => {
    this.plans.set(response.data);
  },
  error: console.error
});
}

  openAdd() {

    const dialogRef = this.dialog.open(PlanAddComponent, {

      width: '700px'

    });

    dialogRef.afterClosed().subscribe(newPlan => {

      if(!newPlan)return;

        this.plans.update(plans => [

          newPlan,
          ...plans
        ]);


    });

  }

  openDetails(plan: CitoyenActivitePlan){

    const dialogRef = this.dialog.open(PlanDetailComponent,{

      width:'700px',

      data: plan

    });

    dialogRef.afterClosed().subscribe(result=>{

      if(result==="edit"){

        this.openEdit(plan);

      }

    });

  }

  openEdit(plan: CitoyenActivitePlan){

    const dialogRef = this.dialog.open(PlanEditComponent,{

      width:'700px',

      data: plan

    });

    dialogRef.afterClosed().subscribe(updatedPlan => {

      if(!updatedPlan){

        return;
     }

    this.plans.update(plans =>

      plans.map(plan =>

        plan.idCitoyenActivitePlan === updatedPlan.idCitoyenActivitePlan

        ? updatedPlan
        
        :plan
      )

    );

    });

  }

  deletePlan(id:number){

    if(!confirm("Supprimer ce plan ?")){

      return;

    }

    this.service.delete(id).subscribe({

      next:() => {

        this.plans.update(plans =>

          plans.filter(

            p => p.idCitoyenActivitePlan !== id
          )
        );

        this.notification.success(
          "Plan supprimé avec succès"
        );

      },

      error:() =>{
        this.notification.error(
          "Impossible de supprimer ce plan"
        );
      }

    });

  }

}