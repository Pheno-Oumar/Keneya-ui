import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-citoyen',
  imports: [],
  templateUrl: './header-citoyen.html',
  styleUrl: './header-citoyen.css',
})
export class HeaderCitoyen {
  @Input() titre = 'Keneyakolochi';
  @Input() sousTitre = 'je sais pas encore quoi dire';
  @Input() nbNotifications = 0;
}
