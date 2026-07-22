import { Component, inject, Input, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth-service';
import { Utilisateur } from '../../../shared/models/utilisateur';

@Component({
  selector: 'app-header-citoyen',
  imports: [],
  templateUrl: './header-citoyen.html',
  styleUrl: './header-citoyen.css',
})
export class HeaderCitoyen {
  private auth = inject(AuthService)
  @Input() titre = 'Keneyakolochi';
  @Input() sousTitre = 'je sais pas encore quoi dire';
  @Input() nbNotifications = 0;

   user = this.auth.user
  

 

}
