import { Component, inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { ConseilFormDialog } from '../dialogs/conseil-form-dialog/conseil-form-dialog';
import { ConseilService } from '../../../core/services/conseil/conseil-service';
import { ConseilResponse, ConseilResponseInterface } from '../../models/Conseil';
import { ConseilDetailDialog } from '../dialogs/conseil-detail-dialog/conseil-detail-dialog';

@Component({
  selector: 'app-conseil-component',
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatChipsModule
  ],
  templateUrl: './conseil-component.html',
  styleUrl: './conseil-component.css',
})
export class ConseilComponent {
  private dialog = inject(MatDialog);
  private service = inject(ConseilService);
  
  displayedColumns: string[] = ['id', 'titre', 'typeConseil', 'categorieNom', 'archive', 'actions'];
  dataSource = new MatTableDataSource<ConseilResponse>([]);
  allConseils: ConseilResponse[] = [];
  showArchived = false;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.loadConseils();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadConseils() {
    this.service.getAll().subscribe({
      next: (response) => {
        this.allConseils = response.data;
        this.updateDataSource();
      },
      error: (error) => {
        console.error('Erreur lors du chargement des conseils', error);
      }
    });
  }

  updateDataSource() {
    let filtered = this.allConseils;
    if (!this.showArchived) {
      filtered = filtered.filter(c => !c.archive);
    }
    this.dataSource.data = filtered;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  filterByType(type: string) {
    if (type) {
      this.dataSource.data = this.dataSource.data.filter(c => c.typeConseil === type);
    } else {
      this.updateDataSource();
    }
  }

  toggleArchived(checked: boolean) {
    this.showArchived = checked;
    this.updateDataSource();
    this.dataSource.filter = '';
  }

  getTypeColor(type: string): string {
    const colors: {[key: string]: string} = {
      'VIDEO': 'primary',
      'TEXTE': 'accent',
      'AUDIO': 'warn'
    };
    return colors[type] || 'primary';
  }

  ajouter() {
    const dialogRef = this.dialog.open(ConseilFormDialog, {
      width: '600px',
      maxHeight: '100%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadConseils();
      }
    });
  }

  modifier(conseil: ConseilResponseInterface) {
    const dialogRef = this.dialog.open(ConseilFormDialog, {
      width: '600px',
      maxHeight: '100%',
      data: { conseil, mode: 'edit' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadConseils();
      }
    });
  }

 detail(conseil: ConseilResponse) {
  const dialogRef = this.dialog.open(ConseilDetailDialog, {
    width: '700px',
    maxWidth: '90vw',
    maxHeight: '90vh',
    data: { 
      conseil: conseil,
      readonly: false // Pour permettre les modifications
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result?.updated) {
      this.loadConseils(); // Rafraîchir la liste
    }
    if (result?.deleted) {
      this.loadConseils(); // Rafraîchir la liste
    }
  });
}
  supprimer(conseil: ConseilResponse) {
    if (confirm(`Voulez-vous vraiment supprimer le conseil "${conseil.titre}" ?`)) {
      this.service.delete(conseil.id).subscribe({
        next: () => {
          this.allConseils = this.allConseils.filter(c => c.id !== conseil.id);
          this.updateDataSource();
        },
        error: (error) => {
          console.error('Erreur lors de la suppression', error);
        }
      });
    }
  }
}