import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Categorie } from '../../shared/models/categorie-conseil.model';
import { CategorieConseilService } from '../../core/services/categorie-conseil-service/categorie-conseil-service';

@Component({
  selector: 'app-categorie-conseil',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule
  ],
  templateUrl: './categorie-conseil.html',
  styleUrls: ['./categorie-conseil.css']
})
export class CategorieConseil implements OnInit {
  categories: Categorie[] = [];
  showForm: boolean = false;
  isEditing: boolean = false;

  currentCategorie: Categorie = { 
    nom: '', 
    description: '', 
    archive: false 
  };

  constructor(
    private categorieService: CategorieConseilService,
    private cdr: ChangeDetectorRef,
    
  ) {}

  ngOnInit(): void {
    this.chargerCategories();
  }

  chargerCategories(): void {
    this.categorieService.getAllCategories().subscribe({
      next: (donnees) => {
        this.categories = donnees;
        this.cdr.detectChanges();
      },
      error: (err: unknown) => {
        console.error('Erreur lors du chargement des catégories :', err);
      }
    });
  }

  

  ouvrirFormulaire(categorie?: Categorie): void {
    if (categorie) {
      this.isEditing = true;
      this.currentCategorie = { ...categorie };
    } else {
      this.isEditing = false;
      this.currentCategorie = { nom: '', description: '', archive: false };
    }
    this.showForm = true;
  }

  fermerFormulaire(): void {
    this.showForm = false;
  }

  enregistrer(): void {
  
    if (!this.currentCategorie.nom?.trim() || !this.currentCategorie.description?.trim()) {
      alert('Veuillez remplir le nom et la description.');
      return;
    }

    if (this.isEditing && this.currentCategorie.id) {
      const updatePayload: Partial<Categorie> = {
        id: this.currentCategorie.id,
        nom: this.currentCategorie.nom.trim(),
        description: this.currentCategorie.description.trim(),
        archive: false
      };

      this.categorieService.updateCategorie(this.currentCategorie.id, updatePayload).subscribe({
        next: () => {
          this.chargerCategories();
          this.fermerFormulaire();
        },
        error: (err: unknown) => console.error('Erreur de modification :', err)
      });
    } else {
      // Payload pour la création
      const createPayload = {
        nom: this.currentCategorie.nom.trim(),
        description: this.currentCategorie.description.trim()
      };

      this.categorieService.createCategorie(createPayload).subscribe({
        next: () => {
          this.chargerCategories();
          this.fermerFormulaire();
        },
        error: (err: unknown) => console.error('Erreur de création :', err)
      });
    }
  }

  supprimer(id: number): void {
    if (confirm('Voulez-vous vraiment archiver cette catégorie ?')) {
      this.categorieService.deleteCategorie(id).subscribe({
        next: () => {
          this.chargerCategories();
        },
        error: (err: unknown) => console.error('Erreur lors de l\'archivage :', err)
      });
    }
  }
}