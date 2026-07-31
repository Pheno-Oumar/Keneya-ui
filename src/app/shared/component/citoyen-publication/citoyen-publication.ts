import { Component, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PublicationService } from '../../../core/services/publication/publication-service';
import { Publication } from '../../../shared/models/Publication';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { CitoyenPublicationDetail } from '../citoyen-publication-detail/citoyen-publication-detail';

@Component({
  selector: 'app-citoyen-publication',
  imports: [
    MatCardModule,
    MatChipsModule,
    MatProgressBarModule,
    MatIcon,
    DatePipe,
  ],
  templateUrl: './citoyen-publication.html',
  styleUrl: './citoyen-publication.css',
})
export class CitoyenPublication {
  private publicationSErvice = inject(PublicationService);
  publication = signal<Publication[]>([]);
  private dialog = inject(MatDialog);

  longText = `The Chihuahua is a Mexican breed of toy dog. It is named for the
  Mexican state of Chihuahua and is among the smallest of all dog breeds. It is
  usually kept as a companion animal or for showing.`;

  ngOnInit(): void {
    this.getPublication();
  }

  getPublication() {
    this.publicationSErvice.getMyPublications().subscribe({
      next: (res) => this.publication.set(res.data),
      error: (err) => console.log('erro pub ci', err),
    });
  }

  ouvrirDetail(pub: Publication) {
    this.dialog.open(CitoyenPublicationDetail, {
      data: pub,
      width: '500px',
    });
  }
}
