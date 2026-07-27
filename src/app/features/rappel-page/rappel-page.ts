import {
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
  Pipe,
  signal,
} from '@angular/core';
import { Rappel, RappelResponse } from '../../shared/models/rappel';
import { RappelService } from '../../core/services/rappel-service';
import { DatePipe } from '@angular/common';
import { FormsRappel } from '../../shared/component/forms-rappel/forms-rappel';
import { FormGroup } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-rappel-page',
  imports: [
    DatePipe,
    FormsRappel,
    MatTabsModule,
    MatCardContent,
    MatCardActions,
    MatIcon,
    MatCardSubtitle,
    MatCardHeader,
    MatCardHeader,
    MatCard,
    MatCardTitle,
  ],
  templateUrl: './rappel-page.html',
  styleUrl: './rappel-page.css',
})
export class RappelPage implements OnInit, OnDestroy {
  rappelsAVenir = signal<RappelResponse[] | []>([]);
  notifications = signal<RappelResponse[] | []>([]);
  rappelTerminer = signal<RappelResponse[] | []>([]);
  showForm = false;

  pollingHandle: any;
  private cdr = inject(ChangeDetectorRef);

  private rappelService = inject(RappelService);

  ngOnInit() {
    this.chargerRappelsActifs();
    this.chargerRappelsTerminer();
    this.demarrerPolling();
  }

  ngOnDestroy() {
    if (this.pollingHandle) {
      clearInterval(this.pollingHandle);
    }
  }

  chargerRappelsActifs() {
    this.rappelService.getMyrappel().subscribe({
      next: (response) => this.rappelsAVenir.set(response),

      error: (err) => console.log('chargement failed', err),
    });
  }

  chargerRappelsTerminer() {
    this.rappelService.rappelTerminer().subscribe({
      next: (res) => this.rappelTerminer.set(res),
      error: (err) => console.log(err),
    });
  }

  demarrerPolling(intervalMs: number = 6000) {
    this.pollingHandle = setInterval(() => {
      this.rappelService.getRappelsdus().subscribe({
        next: (dus) => {
          if (dus.length > 0) {
            this.notifications.update((notifs) => [...dus]);
            this.chargerRappelsActifs();
          }
        },
        error: (err) => console.error(err),
      });
    }, intervalMs);
  }
  createRappel(rappel: Rappel) {
    this.rappelService.createRappel(rappel).subscribe({
      next: (response) => {
        console.log('Rappel créé :', response);
        this.chargerRappelsActifs();
      },
      error: (err) => console.error(err),
      complete: () => {
        console.log('Création de rappel terminée');
        this.cdr.detectChanges();
      },
    });
  }

  fermerNotification(id: number) {
    this.rappelService.marqueCommeLus(id).subscribe({
      next: () => console.log(' marque comme lus:', id),
      error: (err) => console.log(err),
    });
    this.notifications.update((notifs) => notifs.filter((n) => n.id !== id));
  }

  onSubmitRappel(form: FormGroup) {
    const rappelData = form.value;
    this.rappelService.createRappel(rappelData).subscribe({
      next: () => {
        console.log('rappel created successfully');
      },
      error: (err) => {
        console.log('error creating rappel', err);
      },
      complete: () => {
        this.cdr.detectChanges();
      },
    });
  }

  onOpenForm() {
    this.showForm = true;
  }

  onCloseForm(event: boolean) {
    this.showForm = event;
  }
}
