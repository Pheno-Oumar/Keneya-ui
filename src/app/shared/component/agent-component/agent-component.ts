import { Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { AgentFormDialog } from '../dialogs/agent-form-dialog/agent-form-dialog';
import { AgentService } from '../../../core/services/agent/agent-service';
import { AgentDTOResponse, AgentResponseInterface } from '../../models/agent';
import { AgentDetailDialog } from '../dialogs/agent-detail-dialog/agent-detail-dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-agent-component',
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    MatPaginatorModule,
     CommonModule
  ],
  templateUrl: './agent-component.html',
  styleUrl: './agent-component.css',
})
export class AgentComponent {
  private dialog = inject(MatDialog);
  private service = inject(AgentService);

  displayedColumns: string[] = ['id', 'nom', 'prenom', 'email', 'telephone', 'actions'];
  dataSource = new MatTableDataSource<AgentResponseInterface>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  get agents(): AgentResponseInterface[] {
    return this.dataSource.data;
  }

  set agents(value: AgentResponseInterface[]) {
    this.dataSource.data = value;
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  ngOnInit() {
  this.service.getAll().subscribe({
    next: response => {
      this.dataSource.data = response.data;
    }
  });
}

ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
}

  ajouter() {
    this.dialog.open(AgentFormDialog, {
      width: '600px',
      maxHeight: '100%',
    }).afterClosed().subscribe((result)=>{
      if(result === true){
        this.ngOnInit();
      }
    });
    
  }

  // modifier(agent: AgentResponseInterface) {
  //   this.dialog.open(AgentFormDialog, {
  //     width: '600px',
  //     maxHeight: '100%',
  //     data: { agent, mode: 'edit' }
  //   });
  // }

  detail(agent: AgentDTOResponse) {
  const dialogRef = this.dialog.open(AgentDetailDialog, {
    width: '750px',
    maxWidth: '95vw',
    maxHeight: '90vh',
    panelClass: 'custom-dialog-container',
    data: { 
      agent: agent,
      readonly: false
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result?.updated || result?.deleted) {
      this.ngOnInit(); 
    }
  });
}

  supprimer(agent: AgentResponseInterface) {
    if (confirm(`Voulez-vous vraiment supprimer l'agent ${agent.nom} ${agent.prenom} ?`)) {
      this.service.archiver(agent.id).subscribe({
        next: () => {
          this.agents = this.agents.filter(a => a.id !== agent.id);
        },
        error: error => {
          console.error('Erreur lors de la suppression', error);
        }
      });
    }
  }
}