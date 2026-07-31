import { ChangeDetectorRef, Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Publication } from '../../../models/Publication';
import { PublicationService } from '../../../../core/services/publication/publication-service';
import { APIResponse } from '../../../models/APIResponse';

@Component({
  selector: 'app-publication',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './publication-component.html',
  styleUrls: ["./publication-component.css"]
})
export class PublicationComponent implements OnInit {
  // Injection du service
  private pubService = inject(PublicationService);
   cdr = inject(ChangeDetectorRef);
  // Tableau dynamique lié à l'UI
  publications = signal<Publication[]>([]);

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
      next: (data: APIResponse<Publication[]>) => {
        
        // 1. On affiche la réponse exacte dans la console du navigateur pour l'analyser
        console.log('Données reçues du backend :', data);
        this.publications.set(data.data)
        this.cdr.detectChanges(); // Forcer la détection des changements après la mise à jour du signal

      },
      error: (err) => { console.error('Erreur lors du chargement', err); }
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
        next: () => {
          this.loadPublications();
          this.closeModal();
        },
        error: (err) => console.error('Erreur lors de la modification', err)
      });
    } else {
      // Mode Ajout (Requête POST vers le backend)
      console.log(`les infos ${this.formPublication.conseilPreventif}`)

      this.pubService.createPublication(this.formPublication).subscribe({
        next: () => {
          this.loadPublications();
          this.isModalActive = false;
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
          this.publications.update( pubs => pubs.filter(p => p.id !== id) ) ;
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
