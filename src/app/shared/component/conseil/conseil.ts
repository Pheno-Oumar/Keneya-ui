import { Component, inject, signal } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardFooter } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";
import { ConseilService } from '../../../core/services/conseil/conseil-service';
import { ConseilResponse } from '../../models/Conseil';

@Component({
  selector: 'app-conseil',
  imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatIcon, MatCardFooter],
  templateUrl: './conseil.html',
  styleUrl: './conseil.css',
})
export class Conseil {
  private conseilService = inject(ConseilService);
  conseils = signal<ConseilResponse[]>([]);

  ngOnInit(): void {
    this.getConseils();
  }

  getConseils() {
    this.conseilService.getAll().subscribe({
      next: (res) => this.conseils.set(res.data),
      error: (err) => console.log('erro pub ci', err),
    });
  }
}
