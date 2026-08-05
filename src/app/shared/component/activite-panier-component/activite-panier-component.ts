import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { ActiviteResponse } from '../../models/Activite';
import { ActiviteService } from '../../../core/services/activite/activite-service';
import { CitoyenActivitePlanService } from '../../../core/services/citoyen-activite-plan/citoyen-activite-service';
import { CitoyenActiviteService } from '../../../core/services/citoyen-activite/citoyen-activite-service';

@Component({
  selector: 'app-activite-panier-component',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatTooltipModule
  ],
  templateUrl: './activite-panier-component.html',
  styleUrls: ['./activite-panier-component.css']
})
export class ActivitePanierComponent implements OnInit {
  private dialog = inject(MatDialog);
  private router = inject(Router);
  private service = inject(ActiviteService);
  private panierService = inject(CitoyenActivitePlanService);
  private citoyenActiviteService = inject(CitoyenActiviteService);

  selectedActivites: ActiviteResponse[] = [];
  
  // États
  showToast: boolean = false;
  toastMessage: string = '';
  toastType: 'success' | 'error' | 'info' | 'warning' = 'success';
  toastIcon: string = '';
  showValidationModal: boolean = false;
  isLoading: boolean = false;

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
    'EXPERT': 'warn'
  };

  ngOnInit() {
    this.loadPanier();
  }

  loadPanier() {
    // Récupérer les activités sélectionnées depuis le service
    this.citoyenActiviteService.getAll().subscribe({
      next: (activites) => {
        this.selectedActivites = activites.data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement du panier', error);
      }
    });
  }

  retirerDuPanier(activite: ActiviteResponse) {
    this.citoyenActiviteService.delete(activite.nom).subscribe({
      next: () => {
        this.selectedActivites = this.selectedActivites.filter(a => a.idActivites !== activite.idActivites);
        this.showToastMessage(`"${activite.nom}" a été retiré du panier`, 'warning');
      },
      error: (error) => {
        console.error('Erreur lors du retrait du panier', error);
        this.showToastMessage('Erreur lors du retrait du panier', 'error');
      }
    });
  }

  viderPanier() {
    if (confirm('Voulez-vous vraiment vider votre panier ?')) {
      this.citoyenActiviteService.deleteAll().subscribe({
        next: () => {
          this.selectedActivites = [];
          this.showToastMessage('Le panier a été vidé avec succès', 'info');
        },
        error: (error) => {
          console.error('Erreur lors du vidage du panier', error);
          this.showToastMessage('Erreur lors du vidage du panier', 'error');
        }
      });
    }
  }

  validerSelection() {
    if (this.selectedActivites.length === 0) {
      this.showToastMessage('Votre panier est vide', 'warning');
      return;
    }
    this.showValidationModal = true;
  }

  confirmerValidation() {
    this.isLoading = true;
    const activiteIds = this.selectedActivites.map(a => a.idActivites);
    
    this.panierService.validerSelection(activiteIds).subscribe({
      next: (response) => {
        this.showValidationModal = false;
        this.isLoading = false;
        this.showToastMessage('Votre sélection a été validée avec succès !', 'success');
        this.selectedActivites = [];
        // Rediriger vers la page de confirmation
        setTimeout(() => {
          this.router.navigate(['/confirmation-selection']);
        }, 1500);
      },
      error: (error) => {
        console.error('Erreur lors de la validation', error);
        this.isLoading = false;
        this.showToastMessage('Erreur lors de la validation de la sélection', 'error');
      }
    });
  }

  closeValidationModal() {
    this.showValidationModal = false;
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
    switch(type) {
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

  getInitials(prenom: string, nom: string): string {
    if (!prenom && !nom) return '?';
    return (prenom?.charAt(0) || '') + (nom?.charAt(0) || '');
  }

  formatDate(date: string): string {
    if (!date) return 'Date non définie';
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
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

  getTotalDuree(): string {
    let totalMinutes = 0;
    this.selectedActivites.forEach(a => {
      const minutes = typeof a.duree === 'string' ? parseInt(a.duree) : a.duree;
      if (!isNaN(minutes)) {
        totalMinutes += minutes;
      }
    });
    return this.formatDuree(totalMinutes);
  }

  getCategoriesCount(): number {
    const categories = new Set(this.selectedActivites.map(a => a.categorieActivite));
    return categories.size;
  }

  truncateDescription(description: string, maxLength: number = 50): string {
    if (!description) return '';
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + '...';
  }
}