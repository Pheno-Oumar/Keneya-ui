import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin-sidenav',
  imports: [RouterLink,RouterLinkActive,MatIconModule],
  templateUrl: './admin-sidenav.html',
  styleUrl: './admin-sidenav.css',
})
export class AdminSidenav {
  menuItems: MenuItem[] = [
    { label: 'Tableau de board', icon: 'home', route: '/tableau-de-bord' },
    { label: 'Rappels', icon: 'bell', route: '/rappels' },
    { label: 'Activités physiques', icon: 'activity', route: '/activites' },
    { label: 'Conseils', icon: 'shield', route: '/conseils' },
    { label: 'Publications', icon: 'book', route: '/publications' },
    { label: 'Statistiques', icon: 'bar-chart', route: '/statistiques' },
  ];

  deconnexion(): void { }
}
interface MenuItem {
  label: string;
  icon: string;
  route: string;
}