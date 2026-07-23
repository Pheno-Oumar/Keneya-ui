import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CategorieConseilDialog } from '../dialogs/categorie-conseil-dialog/categorie-conseil-dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CategorieActiviteService } from '../../../core/services/categorie-activite/categorie-activite-service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DetailCategorieConseilDialog } from '../dialogs/detail-categorie-conseil-dialog/detail-categorie-conseil-dialog';
import { SupprimerCategorieConseilDialog } from '../dialogs/supprimer-categorie-conseil-dialog/supprimer-categorie-conseil-dialog';
import { CategorieConseilService } from '../../../core/services/categorie-conseil-service/categorie-conseil-service';

@Component({
  selector: 'app-categorie-conseil-component',
  imports: [MatButtonModule, MatDialogModule, MatCardModule, MatPaginatorModule, MatIconModule, MatFormFieldModule, MatTableModule, MatInputModule, MatTooltipModule],
  templateUrl: './categorie-conseil-component.html',
  styleUrl: './categorie-conseil-component.css',
})
export class CategorieConseilComponent implements OnInit{
  private dialog = inject(MatDialog);

  dataSource = new MatTableDataSource<any>();
  constructor(private service: CategorieConseilService) {
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
    this.dialog.open(CategorieConseilDialog, {
      disableClose: true
    });
  }
  detailCategorie(data: object) {
    console.log(data)
    this.dialog.open(DetailCategorieConseilDialog, {
      disableClose: true,
      data: data
    });
  }
  supprimer(data: object) {
    this.dialog.open(SupprimerCategorieConseilDialog, {
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
