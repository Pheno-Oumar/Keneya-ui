import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { ActiviteResponse } from '../../models/Activite';
import { ActiviteService } from '../../../core/services/activite/activite-service';
import { ActiviteDetailDialog } from '../dialogs/activite-detail-dialog/activite-detail-dialog';
import { CitoyenActiviteService } from '../../../core/services/citoyen-activite/citoyen-activite-service';

@Component({
  selector: 'app-activite-citoyen-component',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './activite-citoyen-component.html',
  styleUrls: ['./activite-citoyen-component.css']
})
export class ActiviteCitoyenComponent implements OnInit {
  private dialog = inject(MatDialog);
  private service = inject(ActiviteService);
  private citoyenActiviteService = inject(CitoyenActiviteService);

  // Liste des activités
  allActivites: ActiviteResponse[] = [];
  filteredActivites: ActiviteResponse[] = [];

  // Filtres
  searchTerm: string = '';
  categorieFilter: string = '';
  niveauFilter: string = '';
  periodeFilter: string = '';

  // Catégories disponibles
  categories: string[] = [];

  // États
  isLoading: boolean = false;
  showToast: boolean = false;
  toastMessage: string = '';
  toastType: 'success' | 'error' | 'info' | 'warning' = 'success';
  toastIcon: string = '';

  // Mapping des niveaux
  private niveauLabels: { [key: string]: string } = {
    'DEBUTANT': 'Débutant',
    'INTERMEDIAIRE': 'Intermédiaire',
    'AVANCE': 'Avancé',
    'EXPERT': 'Expert'
  };

  private niveauColors: { [key: string]: string } = {
    'DEBUTANT': 'primary',
    'INTERMEDIAIRE': 'accent',
    'AVANCE': 'warn',
  };

  ngOnInit() {
    this.loadActivites();
  }

  loadActivites() {
    this.isLoading = true;
    this.service.getAll().subscribe({
      next: (response) => {
        this.allActivites = response.data;
        this.filteredActivites = [...this.allActivites];
        this.extractCategories();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des activités', error);
        this.showToastMessage('Erreur lors du chargement des activités', 'error');
        this.isLoading = false;
      }
    });
  }

  extractCategories() {
    const categoriesSet = new Set(this.allActivites.map(a => a.categorieActivite));
    this.categories = Array.from(categoriesSet);
  }

  // Filtres
  applyFilter(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value.trim().toLowerCase();
    this.applyAllFilters();
  }

  filterByCategorie(categorie: string) {
    this.categorieFilter = categorie;
    this.applyAllFilters();
  }

  filterByNiveau(niveau: string) {
    this.niveauFilter = niveau;
    this.applyAllFilters();
  }

  filterByPeriode(periode: string) {
    this.periodeFilter = periode;
    this.applyAllFilters();
  }

  applyAllFilters() {
    let filtered = [...this.allActivites];

    // Filtre par recherche
    if (this.searchTerm) {
      filtered = filtered.filter(a =>
        a.nom.toLowerCase().includes(this.searchTerm) ||
        a.description?.toLowerCase().includes(this.searchTerm) ||
        a.categorieActivite.toLowerCase().includes(this.searchTerm)
      );
    }

    // Filtre par catégorie
    if (this.categorieFilter) {
      filtered = filtered.filter(a => a.categorieActivite === this.categorieFilter);
    }

    // Filtre par niveau
    if (this.niveauFilter) {
      filtered = filtered.filter(a => a.niveau === this.niveauFilter);
    }

    // Filtre par période
    if (this.periodeFilter) {
      const now = new Date();
      filtered = filtered.filter(a => {
        const date = new Date(a.date);
        switch (this.periodeFilter) {
          case 'today':
            return date.toDateString() === now.toDateString();
          case 'week':
            const weekStart = new Date(now);
            weekStart.setDate(now.getDate() - now.getDay());
            weekStart.setHours(0, 0, 0, 0);
            return date >= weekStart;
          case 'weekend':
            const day = date.getDay();
            return day === 0 || day === 6;
          case 'month':
            return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
          default:
            return true;
        }
      });
    }

    this.filteredActivites = filtered;
  }

  resetFilters() {
    this.searchTerm = '';
    this.categorieFilter = '';
    this.niveauFilter = '';
    this.periodeFilter = '';
    this.filteredActivites = [...this.allActivites];

    // Réinitialiser les champs de formulaire
    const searchInput = document.querySelector('.search-field input') as HTMLInputElement;
    if (searchInput) {
      searchInput.value = '';
    }
  }

  getActiveFiltersCount(): number {
    let count = 0;
    if (this.searchTerm) count++;
    if (this.categorieFilter) count++;
    if (this.niveauFilter) count++;
    if (this.periodeFilter) count++;
    return count;
  }

  hasActiveFilters(): boolean {
    return this.getActiveFiltersCount() > 0;
  }

  // Sélection d'activité
  selectionner(activite: ActiviteResponse) {
    activite.selected = !activite.selected;
    
    if (activite.selected) {
      this.citoyenActiviteService.ajouter(activite.nom).subscribe({
        next: pheno =>{

        }
      })
      this.showToastMessage(`"${activite.nom}" a été sélectionnée avec succès !`, 'success');
    } else {
      this.citoyenActiviteService.delete(activite.nom).subscribe({
        next: pheno =>{
          
        }
      })
      this.showToastMessage(`"${activite.nom}" a été désélectionnée`, 'info');
    }
    
  }

  // Voir les détails
  voirDetails(activite: ActiviteResponse) {
    this.dialog.open(ActiviteDetailDialog, {
      width: '700px',
      maxWidth: '90vw',
      maxHeight: '90vh',
      data: {
        activite: activite,
        readonly: true
      }
    });
  }

  // Toast notification
  showToastMessage(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'success') {
    this.toastMessage = message;
    this.toastType = type;
    this.toastIcon = this.getToastIcon(type);
    this.showToast = true;

    setTimeout(() => {
      this.hideToast();
    }, 4000);
  }

  hideToast() {
    this.showToast = false;
  }

  getToastIcon(type: string): string {
    switch (type) {
      case 'success': return 'check_circle';
      case 'error': return 'error';
      case 'warning': return 'warning';
      case 'info': return 'info';
      default: return 'info';
    }
  }

  // Utilitaires
  getNiveauLabel(niveau: string): string {
    return this.niveauLabels[niveau] || niveau;
  }

  getNiveauColor(niveau: string): string {
    return this.niveauColors[niveau] || 'primary';
  }

  formatDate(date: string): string {
    if (!date) return 'Date non définie';
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  formatDuree(duree: string | number): string {
    if (!duree) return '0 min';
    const minutes = typeof duree === 'string' ? parseInt(duree) : duree;
    if (isNaN(minutes)) return '0 min';

    if (minutes < 60) {
      return `${minutes} min`;
    }
    const heures = Math.floor(minutes / 60);
    const restMinutes = minutes % 60;
    return restMinutes > 0 ? `${heures}h ${restMinutes}min` : `${heures}h`;
  }

  truncateDescription(description: string, maxLength: number = 100): string {
    if (!description) return '';
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + '...';
  }

  get totalActivites(): number {
    return this.allActivites.length;
  }
}