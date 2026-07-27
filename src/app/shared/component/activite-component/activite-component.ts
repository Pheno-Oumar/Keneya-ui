import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { ActivitetFormDialog } from '../dialogs/activite-form-dialog/activite-form-dialog';
//import { ActiviteDetailDialog } from '../dialogs/activite-detail-dialog/activite-detail-dialog';
import { ActiviteService } from '../../../core/services/activite/activite-service';
import { ActiviteResponse, TypeNiveauEnum } from '../../models/Activite';

@Component({
  selector: 'app-activite-component',
  standalone: true,
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
    MatChipsModule,
    MatCardModule
  ],
  templateUrl: './activite-component.html',
  styleUrls: ['./activite-component.css']
})
export class ActiviteComponent {
  private dialog = inject(MatDialog);
  private service = inject(ActiviteService);

  displayedColumns: string[] = [
    'idActivites',
    'agent',
    'nom',
    'categorieActivite',
    'niveau',
    'date',
    'duree',
    'actions'
  ];

  dataSource = new MatTableDataSource<ActiviteResponse>([]);
  allActivites: ActiviteResponse[] = [];

  // Statistiques
  totalActivites = 0;
  activitesAujourdhui = 0;
  categoriesCount = 0;
  niveauxCount = 0;

  // Filtres
  categories: string[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.loadActivites();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadActivites() {
    this.service.getAll().subscribe({
      next: (response) => {
        this.allActivites = response.data;
        this.updateDataSource();
        this.calculateStats();
        this.extractCategories();
      },
      error: (error) => {
        console.error('Erreur lors du chargement des activités', error);
      }
    });
  }

  updateDataSource() {
    this.dataSource.data = this.allActivites;
  }

  calculateStats() {
    this.totalActivites = this.allActivites.length;

    // Activités d'aujourd'hui
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    this.activitesAujourdhui = this.allActivites.filter(a => {
      const date = new Date(a.date);
      date.setHours(0, 0, 0, 0);
      return date.getTime() === today.getTime();
    }).length;

    // Nombre de catégories uniques
    const categoriesSet = new Set(this.allActivites.map(a => a.categorieActivite));
    this.categoriesCount = categoriesSet.size;

    // Nombre de niveaux uniques
    const niveauxSet = new Set(this.allActivites.map(a => a.niveau));
    this.niveauxCount = niveauxSet.size;
  }

  extractCategories() {
    const categoriesSet = new Set(this.allActivites.map(a => a.categorieActivite));
    this.categories = Array.from(categoriesSet);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  filterByCategorie(categorie: string) {
    if (categorie) {
      this.dataSource.data = this.allActivites.filter(a => a.categorieActivite === categorie);
    } else {
      this.updateDataSource();
    }
  }

  filterByNiveau(niveau: string) {
    if (niveau) {
      this.dataSource.data = this.allActivites.filter(a => a.niveau === niveau);
    } else {
      this.updateDataSource();
    }
  }

  filterByPeriode(periode: string) {
    const now = new Date();
    let filtered = this.allActivites;

    switch (periode) {
      case 'today':
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        filtered = this.allActivites.filter(a => {
          const date = new Date(a.date);
          date.setHours(0, 0, 0, 0);
          return date.getTime() === today.getTime();
        });
        break;
      case 'week':
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - now.getDay());
        weekStart.setHours(0, 0, 0, 0);
        filtered = this.allActivites.filter(a => {
          const date = new Date(a.date);
          return date >= weekStart;
        });
        break;
      case 'month':
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        filtered = this.allActivites.filter(a => {
          const date = new Date(a.date);
          return date >= monthStart;
        });
        break;
      default:
        filtered = this.allActivites;
    }

    this.dataSource.data = filtered;
  }

  getNiveauColor(niveau: TypeNiveauEnum): string {
    const colors: { [key: string]: string } = {
      'DEBUTANT': 'primary',
      'INTERMEDIAIRE': 'accent',
      'AVANCE': 'warn'
        };
    return colors[niveau] || 'primary';
  }

  ajouter() {
    const dialogRef = this.dialog.open(ActivitetFormDialog, {
      width: '600px',
      maxHeight: '100%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadActivites();
      }
    });
  }

  modifier(activite: ActiviteResponse) {
    const dialogRef = this.dialog.open(ActivitetFormDialog, {
      width: '600px',
      maxHeight: '100%',
      data: { activite, mode: 'edit' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadActivites();
      }
    });
  }

  // detail(activite: ActiviteResponse) {
  //   this.dialog.open(ActiviteDetailDialog, {
  //     width: '700px',
  //     maxWidth: '90vw',
  //     maxHeight: '90vh',
  //     data: {
  //       activite: activite,
  //       readonly: false
  //     }
  //   });
  // }

  supprimer(activite: ActiviteResponse) {
    if (confirm(`Voulez-vous vraiment supprimer l'activité "${activite.nom}" ?`)) {
      this.service.delete(activite.idActivites).subscribe({
        next: () => {
          this.allActivites = this.allActivites.filter(a => a.idActivites !== activite.idActivites);
          this.updateDataSource();
          this.calculateStats();
        },
        error: (error) => {
          console.error('Erreur lors de la suppression', error);
        }
      });
    }
  }
}