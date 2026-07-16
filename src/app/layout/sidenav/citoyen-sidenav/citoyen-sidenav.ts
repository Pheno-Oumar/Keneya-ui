import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar-citoyen',
  imports: [RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './citoyen-sidenav.html',
  styleUrl: './citoyen-sidenav.css',
})
export class CitoyenSidenav {
  menuItems: MenuItem[] = [
    { label: 'Tableau de board', icon: 'home', route: '/tableau-de-bord' },
    { label: 'Rappels', icon: 'alarm', route: '/rappels' },
    { label: 'Activités physiques', icon: 'local_activity', route: '/activites' },
    { label: 'Conseils', icon: 'shield', route: '/conseils' },
    { label: 'Publications', icon: 'book', route: '/publications' },
    { label: 'Statistiques', icon: 'bar_chart', route: '/statistiques' },
  ];

  deconnexion(): void {}
}