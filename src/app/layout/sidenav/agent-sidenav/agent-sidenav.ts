import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/services/auth-service';

@Component({
  selector: 'app-agent-sidenav',
  imports: [RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './agent-sidenav.html',
  styleUrl: './agent-sidenav.css',
})
export class AgentSidenav {

   auth = inject(AuthService);
  router = inject(Router);
  menuItems: MenuItem[] = [
    { label: 'Tableau de board', icon: 'home', route: '/agent' },
    { label: 'Publications', icon: 'category', route: '/agent/publications' },
    { label: 'Conseils', icon: 'bar_chart', route: '/agent/conseils' },
    { label: 'Activites', icon: 'bar_chart', route: '/agent/activites' },
  ];

  deconnexion(): void { 
    this.auth.logout().subscribe({
      next: (res) => {
        this.router.navigate(['/login']);
      },
      error: (res) => console.log(res),
    });
  }
}
interface MenuItem {
  label: string;
  icon: string;
  route: string;
}