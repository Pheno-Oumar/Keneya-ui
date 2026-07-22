import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit, Pipe } from '@angular/core';
import { Rappel, RappelResponse } from '../../shared/models/rappel';
import { RappelService } from '../../core/services/rappel-service';
import { DatePipe } from '@angular/common';
import { FormsRappel } from '../../shared/component/forms-rappel/forms-rappel';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-rappel-page',
  imports: [DatePipe, FormsRappel],
  templateUrl: './rappel-page.html',
  styleUrl: './rappel-page.css',
})
export class RappelPage implements OnInit, OnDestroy {
  rappelsAVenir: RappelResponse[] = [];
  notifications: RappelResponse[] = [];
  showForm = false;

  pollingHandle: any;
  private cdr = inject(ChangeDetectorRef);

  private rappelService = inject(RappelService);

  ngOnInit() {
    this.chargerRappelsActifs();
    // this.demarrerPolling();
  }

  ngOnDestroy() {
    if (this.pollingHandle) {
      clearInterval(this.pollingHandle);
    }
  }

  chargerRappelsActifs() {
    this.rappelService.getMyrappel().subscribe({
      next: (response) => (this.rappelsAVenir = response),

      error: (err) => console.log('chargement failed', err),
      complete: () => {
        // console.log(this.rappelsAVenir);
        this.cdr.detectChanges();
      },
    });
  }

  demarrerPolling(intervalMs: number = 3000) {
    this.pollingHandle = setInterval(() => {
      this.rappelService.getRappelsdus().subscribe({
        next: (dus) => {
          console.log('Rappels dus reçus :', dus);
          if (dus.length > 0) {
            this.notifications = [...this.notifications, ...dus];
            this.chargerRappelsActifs();
          }
        },
        error: (err) => console.error(err),
        complete: () => {
          console.log('Polling terminé');
          this.cdr.detectChanges();
        },
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
    this.notifications = this.notifications.filter((n) => n.id !== id);
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
