import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CategorieActiviteDialog } from '../dialogs/categorie-activite-dialog/categorie-activite-dialog';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CategorieActiviteService } from '../../../core/services/categorie-activite/categorie-activite-service';
import { DetailCategorieActiviteDialog } from '../dialogs/detail-categorie-activite-dialog/detail-categorie-activite-dialog';
import { SupprimerCategorieActiviteDialog } from '../dialogs/supprimer-categorie-activite-dialog/supprimer-categorie-activite-dialog';

@Component({
  standalone: true,
  selector: 'app-categorie-activite-component',
  imports: [MatButtonModule, MatDialogModule, MatCardModule, MatPaginatorModule, MatIconModule, MatFormFieldModule, MatTableModule, MatInputModule, MatTooltipModule],
  templateUrl: './categorie-activite-component.html',
  styleUrls: ['./categorie-activite-component.css'],
})
export class CategorieActiviteComponent implements OnInit {
  private dialog = inject(MatDialog);

  dataSource = new MatTableDataSource<any>();
  constructor(private service: CategorieActiviteService) {
    console.log("Constructeur");
  }

  ngOnInit() {
    console.log("ngOnInit");

    this.service.getCategories().subscribe({
      next: (response) => {
        console.log("Réponse :", response);
        this.dataSource.data = response.data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }


  ajouter() {
    this.dialog.open(CategorieActiviteDialog, {
      disableClose: true
    });
  }
  detailCategorie(data: object) {
    console.log(data)
    this.dialog.open(DetailCategorieActiviteDialog, {
      disableClose: true,
      data: data
    });
  }
  supprimer(data: object) {
    this.dialog.open(SupprimerCategorieActiviteDialog, {
      disableClose: true,
      data: data
    });
  }

  displayedColumns = [
    "id", "nom", "description", "actions"
  ]


  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
}



