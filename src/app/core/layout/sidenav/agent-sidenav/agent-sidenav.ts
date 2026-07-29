import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../auth/auth-service';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-agent-sidenav',
  imports: [
    RouterLink,
    RouterLinkActive,
    MatIconModule
  ],
  templateUrl: './agent-sidenav.html',
  styleUrls: ['./agent-sidenav.css'],
})
export class AgentSidenav {

  auth = inject(AuthService);
  router = inject(Router);

  menuItems: MenuItem[] = [
    {
      label: 'Tableau de bord',
      icon: 'home',
      route: '/agent'
    },
    {
      label: 'Publications',
      icon: 'article',
      route: '/agent/publications'
    },
    {
      label: 'Conseils',
      icon: 'lightbulb',
      route: '/agent/categories-conseil'
    },
    {
      label: 'Activités physiques',
      icon: 'fitness_center',
      route: '/agent/activites'
    }
  ];


  deconnexion(): void {
    this.auth.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log('Erreur déconnexion :', err);
      },
    });
  }
}


