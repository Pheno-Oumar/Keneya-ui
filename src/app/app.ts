import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ["./app.css"]
})
export class App {

  protected readonly title = signal('keneya-kolochili-ui');

  private router = inject(Router);

  constructor() {

    console.log("🔥 App chargé");

    this.router.events.subscribe(event => {

      console.log("EVENT ROUTER :", event);

      if (event instanceof NavigationStart) {
        console.log("➡️ Navigation vers :", event.url);
      }

      if (event instanceof NavigationEnd) {
        console.log("✅ Navigation réussie :", event.urlAfterRedirects);
      }

      if (event instanceof NavigationError) {
        console.error("❌ Erreur navigation :", event.error);
      }

    });

  }

}
