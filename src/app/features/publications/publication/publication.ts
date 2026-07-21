
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
 // Ajuste le chemin d'importation
 // Ajuste le chemin d'importation
import { Publication } from '../../../shared/models/publication';
import { PublicationService } from '../../../core/services/publication';

@Component({
  selector: 'app-publication',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './publication.html',
  styleUrl: './publication.css'
})
export class PublicationComponent implements OnInit {
  // Injection du service
  private pubService = inject(PublicationService);

  // Tableau dynamique lié à l'UI
  publications: Publication[] = [];

  // Variables d'état
  isModalActive: boolean = false;
  activeMenuIndex: number | null = null; 
  isEditing: boolean = false; 

  // Formulaire de saisie adapté à ta nouvelle interface
  formPublication: Publication = this.initForm();

  ngOnInit(): void {
    // 1. Charger les publications depuis le backend
    this.loadPublications();

    // 2. Fermer les menus au clic extérieur
    document.addEventListener('click', () => {
      this.activeMenuIndex = null;
    });
  }

  // Charger les données dynamiquement
 loadPublications(): void {
  this.pubService.getMyPublications().subscribe({
    next: (data: any) => {
      // 1. On affiche la réponse exacte dans la console du navigateur pour l'analyser
      console.log('Données reçues du backend :', data);

      // 2. On vérifie dynamiquement si c'est un tableau ou un objet
      if (Array.isArray(data)) {
        this.publications = data.map(pub => ({
          ...pub,
          likes: pub.likes ?? 0,
          dislikes: pub.dislikes ?? 0
        }));
      } else if (data && typeof data === 'object') {
        // Si ton backend renvoie un objet avec une clé comme "content" (standard Spring Boot Pageable)
        // ou "publications" ou "data" :
        const list = data.content || data.publications || data.data || [];
        
        this.publications = list.map((pub: any) => ({
          ...pub,
          likes: pub.likes ?? 0,
          dislikes: pub.dislikes ?? 0
        }));
      }
    },
    error: (err) => console.error('Erreur lors du chargement', err)
  });
}
  initForm(): Publication {
    return {
      nomMaladie: '',
      symptome: '',
      conseilPreventif: '',
      source: '',
      dateCreation: new Date(),
      likes: 0,
      dislikes: 0
    };
  }

  toggleMenu(event: Event, index: number): void {
    event.stopPropagation();
    this.activeMenuIndex = this.activeMenuIndex === index ? null : index;
  }

  openAddModal(): void {
    this.isEditing = false;
    this.formPublication = this.initForm();
    this.isModalActive = true;
  }

  openEditModal(pub: Publication): void {
    this.isEditing = true;
    this.formPublication = { ...pub };
    this.isModalActive = true;
  }

  closeModal(): void {
    this.isModalActive = false;
  }

  onSubmit(): void {
    if (this.isEditing) {
      // Mode Édition (Requête PUT vers le backend)
      this.pubService.updatePublication(this.formPublication).subscribe({
        next: (updatedPub) => {
          this.publications = this.publications.map(p => 
            p.id === updatedPub.id ? { ...updatedPub, likes: p.likes, dislikes: p.dislikes } : p
          );
          this.closeModal();
        },
        error: (err) => console.error('Erreur lors de la modification', err)
      });
    } else {
      // Mode Ajout (Requête POST vers le backend)
      this.pubService.createPublication(this.formPublication).subscribe({
        next: (newPub) => {
          // On ajoute la nouvelle publication en haut de la liste locale
          this.publications = [{ ...newPub, likes: 0, dislikes: 0 }, ...this.publications];
          this.closeModal();
        },
        error: (err) => console.error("Erreur lors de l'ajout", err)
      });
    }
  }

  onDelete(id?: number): void {
    if (id && confirm('Voulez-vous supprimer cette publication ?')) {
      this.pubService.deletePublication(id).subscribe({
        next: () => {
          // Filtrer localement pour mettre à jour l'UI instantanément sans recharger la page
          this.publications = this.publications.filter(p => p.id !== id);
        },
        error: (err) => console.error('Erreur lors de la suppression', err)
      });
    }
  }

  onOverlayClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (target.classList.contains('modal-overlay')) {
      this.closeModal();
    }
  }
}